from pydantic import BaseModel
from typing import Optional, Dict

class ChatRequest(BaseModel):
    """
    The schema for chat requests.
    
    Attributes:
        prompt (str): The user's message/question to send to the AI
    """
    prompt: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "What is the capital of France?"
            }
        }

class Verdict(BaseModel):
    literal: str
    intent: str
    canary: str

class ChatResponse(BaseModel):
    success: bool
    response: str
    security_check: str
    verdict: Optional[Verdict] = None
