from typing import List, Dict

# Session State (single active session for student demo)
SESSION_HISTORY: List[Dict[str, str]] = []

def reset_session_history() -> None:
    """Clears the in-memory session history."""
    SESSION_HISTORY.clear()

def append_history(role: str, content: str) -> None:
    """Appends a message to the session history."""
    SESSION_HISTORY.append({"role": role, "content": content})

def get_history() -> List[Dict[str, str]]:
    return SESSION_HISTORY
