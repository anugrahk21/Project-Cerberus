"""
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Backend Logic & Security Architecture
Description: The main FastAPI application entry point.
Note: Built for AI Cybersecurity Research Portfolio.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import VERSION
from app.api.routes import router

# Initialize FastAPI application
app = FastAPI(
    title="Project Cerberus - The AI Iron Dome",
    description="A secure reverse proxy for AI APIs with multi-layered security screening",
    version=VERSION
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://project-cerberus-pi.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routes
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Project Cerberus...")
    print("🛡️ The AI Iron Dome is active")
    uvicorn.run(app, host="0.0.0.0", port=8000)
