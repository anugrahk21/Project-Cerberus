"""
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Backend Logic & Security Architecture
Description: Configuration management - loads environment variables and API keys.
             This is the first line of defense: without proper credentials, the system won't start.
Note: Built for AI Cybersecurity Research Portfolio.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
# This keeps secrets out of the source code (Security Best Practice)
load_dotenv()

# Get the Gemini API key from environment variables
# We use os.getenv() which returns None if the variable doesn't exist
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Get project version from environment variables
VERSION = os.getenv("VERSION", "1.0")  # Default to 1.0 if not specified

# Fail-fast validation: If no API key is found, stop the application immediately
# This teaches good debugging practices - better to fail early with a clear message
# than to fail later with cryptic errors during API calls
if not GEMINI_API_KEY:
    raise ValueError(
        "❌ GEMINI_API_KEY not found in environment variables!\n"
        "Please create a .env file in the project root with:\n"
        "GEMINI_API_KEY=your_api_key_here"
    )

# If we reach here, configuration is valid
print("✅ Configuration loaded successfully")
print(f"✅ Project Version: {VERSION}")
print(f"✅ Gemini API Key found (first 10 chars): {GEMINI_API_KEY[:10]}...")
