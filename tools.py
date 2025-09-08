from langchain.tools import tool
import json
import random
from gtts import gTTS
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@tool
def get_motivational_quote(faith: str) -> str:
    """Fetch a random motivational quote based on user's faith."""
    with open('quotes.json', 'r') as f:
        quotes = json.load(f)
    faith_key = faith.lower() if faith.lower() in quotes else 'general'
    quote_data = random.choice(quotes[faith_key])
    return f"{quote_data['quote']} - {quote_data['source']}"

@tool
def generate_voice_support(text: str) -> str:
    """Generate calming voice audio from text and return file path."""
    try:
        logger.debug(f"Generating audio for text: {text}")
        tts = gTTS(text=text, lang='en', slow=True)
        file_path = os.path.join(os.getcwd(), 'voice_support.mp3')
        logger.debug(f"Saving audio to {file_path}")
        tts.save(file_path)
        if os.path.exists(file_path):
            logger.debug(f"Audio file created successfully: {file_path}, size: {os.path.getsize(file_path)} bytes")
        else:
            logger.error(f"Audio file not created at {file_path}")
            raise FileNotFoundError(f"Audio file not created at {file_path}")
        return 'voice_support.mp3'
    except Exception as e:
        logger.error(f"Error generating audio: {str(e)}")
        return f"Error generating audio: {str(e)}"