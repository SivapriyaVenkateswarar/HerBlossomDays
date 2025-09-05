from langchain.tools import tool
import json
import random
from gtts import gTTS
import os

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
    tts = gTTS(text=text, lang='en', slow=True)
    file_path = 'voice_support.mp3'
    tts.save(file_path)
    return file_path