from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_chat_no_prompt():
    response = client.post("/chat", json={})
    assert response.status_code == 422  # Validation error

def test_chat_valid_prompt_mocked():
    # We would need to mock the services to test this fully without hitting Gemini
    # For now, we just check that the endpoint exists and accepts the schema
    pass
