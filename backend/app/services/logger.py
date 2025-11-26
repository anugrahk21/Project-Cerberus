import json
import aiofiles
from pathlib import Path
from datetime import datetime

async def log_attack(prompt: str, reason: str, canary: str, client_ip: str | None = None):
    """
    Logs detected security violations to a JSON file asynchronously.
    """
    # Define the log file path
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    log_file = log_dir / "attacks.json"
    
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "prompt": prompt,
        "reason": reason,
        "canary": canary,
        "ip_address": client_ip or "unknown",
        "blocked": True
    }
    
    # Read existing logs
    logs = []
    if log_file.exists():
        try:
            async with aiofiles.open(log_file, 'r', encoding='utf-8') as f:
                content = await f.read()
                logs = json.loads(content)
        except (json.JSONDecodeError, FileNotFoundError):
            logs = []
    
    logs.append(log_entry)
    
    # Write back to file
    async with aiofiles.open(log_file, 'w', encoding='utf-8') as f:
        await f.write(json.dumps(logs, indent=2, ensure_ascii=False))
    
    print(f"📝 Attack logged to {log_file}")
