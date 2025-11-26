import pytest
from unittest.mock import AsyncMock, patch
from app.core.judges import check_safety

@pytest.mark.asyncio
async def test_check_safety_safe():
    with patch("app.core.judges.judge_literal", new_callable=AsyncMock) as mock_literal, \
         patch("app.core.judges.judge_intent", new_callable=AsyncMock) as mock_intent, \
         patch("app.core.judges.judge_canary", new_callable=AsyncMock) as mock_canary:
        
        mock_literal.return_value = True
        mock_intent.return_value = True
        mock_canary.return_value = True
        
        is_safe, reason, canary, error, verdict = await check_safety("Hello")
        
        assert is_safe is True
        assert verdict["literal"] == "safe"
        assert verdict["intent"] == "safe"
        assert verdict["canary"] == "safe"

@pytest.mark.asyncio
async def test_check_safety_unsafe_intent():
    with patch("app.core.judges.judge_literal", new_callable=AsyncMock) as mock_literal, \
         patch("app.core.judges.judge_intent", new_callable=AsyncMock) as mock_intent, \
         patch("app.core.judges.judge_canary", new_callable=AsyncMock) as mock_canary:
        
        mock_literal.return_value = True
        mock_intent.return_value = False # Unsafe
        mock_canary.return_value = True
        
        is_safe, reason, canary, error, verdict = await check_safety("Hack something")
        
        # Intent weight is 3. 3 >= 2 -> Unsafe.
        assert is_safe is False
        assert verdict["intent"] == "unsafe"
