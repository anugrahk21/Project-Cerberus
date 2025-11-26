import os
from datetime import datetime, timedelta
from collections import defaultdict

# In-memory store for rate limiting
# TODO: Move to Redis for production
REQUEST_COUNTERS: dict[str, list[datetime]] = defaultdict(list)

RATE_LIMIT_MAX_REQUESTS = int(os.getenv("CERBERUS_MAX_CHATS", "3"))
RATE_LIMIT_WINDOW_MINUTES = int(os.getenv("CERBERUS_CHAT_WINDOW_MINUTES", "1440"))

def _prune_request_history(ip: str, now: datetime) -> list[datetime]:
    """Removes expired entries from the request history for an IP."""
    window_start = now - timedelta(minutes=RATE_LIMIT_WINDOW_MINUTES)
    history = [ts for ts in REQUEST_COUNTERS[ip] if ts >= window_start]
    REQUEST_COUNTERS[ip] = history
    return history

def check_rate_limit(ip: str) -> tuple[bool, int | None]:
    """Returns True if the IP exceeded the quota along with retry-after seconds."""
    now = datetime.utcnow()
    history = _prune_request_history(ip, now)
    if len(history) >= RATE_LIMIT_MAX_REQUESTS:
        earliest = min(history)
        retry_after_seconds = int(
            (earliest + timedelta(minutes=RATE_LIMIT_WINDOW_MINUTES) - now).total_seconds()
        )
        return True, max(retry_after_seconds, 0)
    return False, RATE_LIMIT_MAX_REQUESTS - len(history)

def record_request(ip: str) -> None:
    """Stores the timestamp of a new request for an IP."""
    now = datetime.utcnow()
    _prune_request_history(ip, now)
    REQUEST_COUNTERS[ip].append(now)
