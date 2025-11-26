from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from app.schemas import ChatRequest, ChatResponse
from app.services.rate_limiter import check_rate_limit, record_request
from app.services.logger import log_attack
from app.services.session import reset_session_history, append_history
from app.services.llm import generate_response
from app.core.judges import check_safety
from app.config import VERSION

router = APIRouter()

@router.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "project": "Project Cerberus - The AI Iron Dome",
        "message": "The guardians are watching. Use POST /chat to interact.",
        "version": VERSION
    }

@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, http_request: Request):
    """The main chat endpoint."""
    user_prompt = payload.prompt
    client_ip = http_request.client.host if http_request.client else "unknown"
    
    # 1. Rate Limiting
    rate_limited, retry_after = check_rate_limit(client_ip)
    if rate_limited:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "rate_limit",
                "message": "Cerberus spotted some clever (and thirsty) probing.\nCaught you!",
                "retry_after": retry_after
            }
        )
    record_request(client_ip)

    # 2. Security Screening (The Council)
    print(f"\n{'='*60}\n📥 New chat request received\n{'='*60}")
    
    try:
        is_safe, reason, canary, had_internal_error, verdict = await check_safety(user_prompt)
        
        if not is_safe:
            await log_attack(user_prompt, reason, canary, client_ip)
            status_code = 503 if had_internal_error else 403
            user_message = (
                "Our safety system is temporarily unavailable. Please try again shortly."
                if had_internal_error
                else "Your prompt triggered our safety filters. Please rephrase your request."
            )
            raise HTTPException(
                status_code=status_code,
                detail={
                    "error": "Request blocked by security system",
                    "message": user_message,
                    "verdict": verdict
                }
            )
        
        # 3. Process Safe Prompts
        print("\n✅ Prompt cleared security - forwarding to Gemini Pro...")
        ai_response = await generate_response(canary, user_prompt)

        # 4. Output Security Check (Canary Detection)
        if canary in ai_response:
            leak_reason = "Model response leaked canary token"
            await log_attack(user_prompt, leak_reason, canary, client_ip)
            verdict["canary"] = "unsafe"
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Response blocked by security system",
                    "message": "The assistant detected a security violation while generating the answer.",
                    "verdict": verdict
                }
            )
        
        print(f"✅ Response received from Gemini Pro\n{'='*60}\n")
        
        # 5. Update History
        append_history("user", user_prompt)
        append_history("assistant", ai_response)

        return {
            "success": True,
            "response": ai_response,
            "security_check": "passed",
            "verdict": verdict
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"❌ Error during chat processing: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": "Something went wrong while processing your request. Please try again later."
            }
        )

@router.get("/logs")
async def view_logs():
    """View attack logs."""
    # In a real app, use a proper database or the logger service to read
    # For now, we read the file directly or use a service method if we added one
    # Let's just read the file for simplicity as per original logic, but async
    import aiofiles
    import json
    from pathlib import Path
    
    log_file = Path("logs/attacks.json")
    if not log_file.exists():
        return {"total_attacks": 0, "attacks": [], "message": "No attacks logged yet"}
    
    async with aiofiles.open(log_file, 'r', encoding='utf-8') as f:
        try:
            content = await f.read()
            logs = json.loads(content)
            return {"total_attacks": len(logs), "attacks": logs}
        except json.JSONDecodeError:
            return {"error": "Log file corrupted", "total_attacks": 0, "attacks": []}

@router.post("/session/reset")
async def reset_session():
    """Clears the in-memory conversation history."""
    reset_session_history()
    return {"message": "Session history cleared", "history_length": 0}
