import os
import warnings
import random
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint
from langchain.agents import initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from langchain.llms.base import LLM
from tools import get_motivational_quote, generate_voice_support
from google.generativeai import configure, GenerativeModel

# Suppress LangChain deprecation warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Load environment variables from .env
load_dotenv()

# Custom Gemini LLM class for LangChain
class GeminiLLM(LLM):
    def __init__(self):
        super().__init__()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env")
        configure(api_key=api_key)
        self._gen_model = GenerativeModel("gemini-1.5-flash")

    def _call(self, prompt: str, stop: list = None) -> str:
        response = self._gen_model.generate_content(prompt)
        return response.text

    @property
    def _llm_type(self) -> str:
        return "gemini"

# Initialize LLM (Gemini or fallback to Hugging Face)
try:
    llm = GeminiLLM()
except Exception as e:
    print(f"Gemini setup failed: {e}. Falling back to Hugging Face.")
    hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
    if not hf_token:
        raise ValueError("HUGGINGFACEHUB_API_TOKEN not found in .env")
    llm = HuggingFaceEndpoint(
        endpoint_url="https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        huggingfacehub_api_token=hf_token,
        task="conversational",
        max_new_tokens=200,
        temperature=0.7
    )

# Memory for anonymous conversation (in-memory, no storage)
memory = ConversationBufferMemory(memory_key="chat_history", input_key="input")

# Tools for the agent
tools = [get_motivational_quote, generate_voice_support]

# Initialize agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    verbose=True
)

# Audio response variations for all period-related terms
audio_options = {
    "pain": [
        "You're managing well. Try a warm compress for relief.",
        "You're strong. A warm bath might help ease the pain.",
        "You've got this. Rest with a heating pad."
    ],
    "cramps": [
        "Cramps can be tough. Try a warm compress to ease them.",
        "You're resilient. Gentle stretching might help with cramps.",
        "Stay strong. A heating pad can soothe the discomfort."
    ],
    "discomfort": [
        "Discomfort is temporary. Try sipping warm tea to relax.",
        "You're doing great. A light walk may ease the discomfort.",
        "You've got this. Rest and hydrate to feel better."
    ],
    "ache": [
        "Aches can be challenging. Try a warm compress for relief.",
        "You're strong. Gentle yoga might help with the ache.",
        "Stay resilient. A warm bath can soothe the ache."
    ],
    "fatigue": [
        "Fatigue is tough. Rest and hydrate to recharge.",
        "You're capable. Try iron-rich foods like spinach to boost energy.",
        "You've got this. A short nap might help with fatigue."
    ],
    "sore": [
        "Soreness can be hard. Try a warm compress to ease it.",
        "You're strong. Gentle stretching might help with soreness.",
        "Stay resilient. Rest and a warm bath can help."
    ],
    "bloating": [
        "Bloating is uncomfortable. Try drinking peppermint tea.",
        "You're doing great. Light exercise might help with bloating.",
        "You've got this. Stay hydrated to ease bloating."
    ],
    "headache": [
        "Headaches can be difficult. Try a cold compress.",
        "You're managing well. Stay hydrated to ease headaches.",
        "You've got this. Rest in a dark room."
    ],
    "backache": [
        "Backaches are common. Try gentle stretching.",
        "You're strong. A heating pad might help with backache.",
        "Stay resilient. Good posture can prevent worsening."
    ],
    "nausea": [
        "Nausea is uncomfortable. Try ginger tea.",
        "You're doing great. Eat small, frequent meals.",
        "You've got this. Avoid strong smells."
    ],
    "vomiting": [
        "Vomiting can be tough. Stay hydrated with small sips.",
        "You're resilient. Rest and avoid heavy foods.",
        "Stay strong. Consult a doctor if persistent."
    ],
    "diarrhea": [
        "Diarrhea can be challenging. Stay hydrated.",
        "You're managing well. Eat plain foods like rice.",
        "You've got this. Avoid dairy products."
    ],
    "constipation": [
        "Constipation is common. Try fiber-rich foods.",
        "You're strong. Drink plenty of water.",
        "Stay resilient. Light exercise can help."
    ],
    "breast tenderness": [
        "Breast tenderness is uncomfortable. Try a supportive bra.",
        "You're doing great. Avoid caffeine to reduce tenderness.",
        "You've got this. A cold compress might help."
    ],
    "acne": [
        "Acne can be frustrating. Keep skin clean and hydrated.",
        "You're managing well. Use gentle skincare products.",
        "Stay strong. Avoid picking at skin."
    ],
    "food cravings": [
        "Food cravings are normal. Choose healthy snacks.",
        "You're doing well. Balance with nutritious meals.",
        "You've got this. Stay hydrated to manage cravings."
    ],
    "insomnia": [
        "Insomnia is tough. Try a relaxing bedtime routine.",
        "You're resilient. Avoid screens before bed.",
        "Stay strong. Herbal tea might help."
    ],
    "dizziness": [
        "Dizziness can be unsettling. Sit down and hydrate.",
        "You're managing well. Eat something light.",
        "You've got this. Rest until it passes."
    ],
    "hot flashes": [
        "Hot flashes are common. Dress in layers.",
        "You're doing great. Stay cool with fans.",
        "You've got this. Avoid spicy foods."
    ],
    "heavy bleeding": [
        "Heavy bleeding can be tough. Stay hydrated and rest.",
        "You're resilient. Use high-absorbency products.",
        "Stay strong. Consult a doctor if concerned."
    ],
    "irregular periods": [
        "Irregular periods can be unsettling. Track your cycle.",
        "You're managing well. Maintain a healthy diet.",
        "You've got this. Consult a doctor if persistent."
    ],
    "spotting": [
        "Spotting is common. Monitor and stay hydrated.",
        "You're doing great. Use light protection.",
        "You've got this. Consult a doctor if frequent."
    ],
    "leg pain": [
        "Leg pain can be tough. Try gentle stretching.",
        "You're strong. A warm bath might help.",
        "Stay resilient. Rest to ease the pain."
    ],
    "abdominal pain": [
        "Abdominal pain is challenging. Try a warm compress.",
        "You're resilient. Gentle yoga might help.",
        "Stay strong. Rest and hydrate."
    ],
    "pelvic pain": [
        "Pelvic pain can be tough. Try a heating pad.",
        "You're strong. Rest and avoid heavy lifting.",
        "You've got this. Consult a doctor if severe."
    ],
    "muscle aches": [
        "Muscle aches are common. Try gentle stretching.",
        "You're managing well. A warm bath can help.",
        "Stay resilient. Rest and hydrate."
    ],
    "joint pain": [
        "Joint pain can be tough. Try gentle movement.",
        "You're strong. A warm compress might help.",
        "You've got this. Rest to ease discomfort."
    ],
    "swollen ankles": [
        "Swollen ankles can be uncomfortable. Elevate your feet.",
        "You're doing great. Stay hydrated.",
        "You've got this. Avoid standing for long."
    ],
    "weight gain": [
        "Weight gain is normal. Focus on balanced meals.",
        "You're managing well. Light exercise can help.",
        "Stay strong. Hydrate and rest."
    ],
    "dry skin": [
        "Dry skin can be bothersome. Use a gentle moisturizer.",
        "You're doing great. Stay hydrated.",
        "You've got this. Avoid harsh soaps."
    ],
    "hair loss": [
        "Hair loss can be worrying. Eat nutrient-rich foods.",
        "You're resilient. Gentle scalp care helps.",
        "Stay strong. Consult a doctor if persistent."
    ],
    "tender gums": [
        "Tender gums are uncomfortable. Use a soft toothbrush.",
        "You're managing well. Rinse with warm water.",
        "You've got this. Avoid spicy foods."
    ],
    "mood swings": [
        "Mood swings are common. Try mindfulness to balance emotions.",
        "You're doing well. A balanced diet can stabilize mood.",
        "You've got this. Talk to a friend for support."
    ],
    "irritability": [
        "Irritability can be challenging. Try relaxation techniques.",
        "You're strong. Exercise might reduce irritability.",
        "Stay resilient. Get enough sleep."
    ],
    "anxiety": [
        "Anxiety is tough. Try deep breathing exercises.",
        "You're capable. Meditation can calm anxiety.",
        "You've got this. Talk to someone you trust."
    ],
    "depression": [
        "Depression can be hard. Reach out for support.",
        "You're strong. Try light activity to lift your mood.",
        "Stay resilient. Professional help is available."
    ],
    "overwhelmed": [
        "You're not alone. Take it one step at a time.",
        "You've got this. Try a short walk to clear your mind.",
        "Take a moment to breathe. You're doing great."
    ],
    "stressed": [
        "You're strong. Rest and hydrate to feel better.",
        "You're capable. Try deep breathing to relax.",
        "You're resilient. A cup of tea might help."
    ],
    "sadness": [
        "Sadness is tough. Reach out to a loved one.",
        "You're doing great. Try light activities to lift your mood.",
        "You've got this. Journaling might help."
    ],
    "anger": [
        "Anger can be intense. Try deep breathing to calm down.",
        "You're strong. A short walk can help.",
        "Stay resilient. Express feelings through writing."
    ],
    "frustration": [
        "Frustration is normal. Take a moment to breathe.",
        "You're managing well. Try a relaxing activity.",
        "You've got this. Talk to someone you trust."
    ],
    "low energy": [
        "Low energy is common. Try iron-rich foods like spinach.",
        "You're resilient. A short nap might help.",
        "Stay strong. Stay hydrated."
    ],
    "moodiness": [
        "Moodiness can be tough. Try mindfulness practices.",
        "You're doing great. A balanced diet helps.",
        "You've got this. Talk to a friend."
    ],
    "emotional": [
        "Feeling emotional is okay. Try journaling your thoughts.",
        "You're strong. Reach out for support.",
        "Stay resilient. Take time for self-care."
    ],
    "tearfulness": [
        "Tearfulness is normal. Let yourself feel and rest.",
        "You're doing great. Talk to someone you trust.",
        "You've got this. Try calming activities."
    ],
    "sensitivity": [
        "Sensitivity can be intense. Practice self-compassion.",
        "You're managing well. Try relaxing music.",
        "Stay strong. Reach out for support."
    ],
    "restlessness": [
        "Restlessness is common. Try light exercise.",
        "You're resilient. Meditation might help.",
        "You've got this. Create a calming routine."
    ],
    "lack of focus": [
        "Lack of focus is normal. Try short tasks.",
        "You're managing well. Take breaks to recharge.",
        "Stay strong. Avoid distractions."
    ],
    "low motivation": [
        "Low motivation can be tough. Set small goals.",
        "You're capable. Try a short walk to boost energy.",
        "You've got this. Celebrate small wins."
    ],
    "period": [
        "Your period is a natural process. Rest and hydrate.",
        "You're doing great. Track your cycle for insights.",
        "Stay strong. Use comfortable products."
    ],
    "menstruation": [
        "Menstruation is normal. Stay hydrated and rest.",
        "You're managing well. Use comfortable protection.",
        "You've got this. Monitor your cycle."
    ],
    "menstrual cycle": [
        "Your cycle is unique. Track it for patterns.",
        "You're managing well. Maintain a healthy diet.",
        "Stay strong. Rest when needed."
    ],
    "pms": [
        "PMS can be challenging. Try relaxation techniques.",
        "You're strong. Eat nutrient-rich foods.",
        "You've got this. Light exercise helps."
    ],
    "pmdd": [
        "PMDD is tough. Reach out for support.",
        "You're resilient. Consult a doctor if needed.",
        "Stay strong. Try mindfulness practices."
    ],
    "flow": [
        "Your flow is natural. Use comfortable products.",
        "You're doing great. Stay hydrated.",
        "You've got this. Rest as needed."
    ],
    "bleeding": [
        "Bleeding is part of your cycle. Stay hydrated.",
        "You're managing well. Use high-absorbency products.",
        "Stay strong. Monitor for changes."
    ],
    "cycle": [
        "Your cycle is unique. Track it for patterns.",
        "You're doing great. Maintain a healthy diet.",
        "Stay strong. Rest when needed."
    ]
}

def handle_query(user_input: str, faith: str = "general") -> dict:
    """Process user query, return response, quote, and optional voice."""
    if not user_input.strip():
        return {
            "text_response": "Please provide a question about menstrual health.",
            "quote": "Your strength is within you. - General Wisdom",
            "voice_support": None
        }
    prompt = f"""
    You are a supportive chatbot for menstrual health, respecting {faith} faith.
    Answer factually and empathetically in a concise manner, including dietary tips like iron-rich foods (e.g., spinach) when relevant.
    Always append a motivational quote using the get_motivational_quote tool.
    If the user mentions any period-related symptoms or feelings, generate a concise, supportive audio summary using generate_voice_support.
    Question: {user_input}
    """
    try:
        chat_history = memory.load_memory_variables({})["chat_history"]
        response = agent.run({"input": prompt, "chat_history": chat_history})
        memory.save_context({"input": user_input}, {"output": response})
    except Exception as e:
        response = f"Error processing query: {str(e)}"

    quote = get_motivational_quote.invoke({"faith": faith})
    voice_path = None
    trigger_words = [
        "pain", "pains", "hurting", "aching", "cramps", "cramping", "discomfort", "uncomfortable", "ache", "aches",
        "fatigue", "tired", "exhausted", "sore", "soreness", "bloating", "bloated", "feeling bloated", "felt bloated",
        "headache", "headaches", "backache", "backaches", "nausea", "nauseous", "vomiting", "threw up", "diarrhea",
        "loose stool", "constipation", "constipated", "breast tenderness", "breast pain", "sore breasts", "acne",
        "breakouts", "food cravings", "craving food", "insomnia", "can't sleep", "dizziness", "dizzy", "hot flashes",
        "hot flash", "heavy bleeding", "heavy flow", "irregular periods", "irregular cycle", "spotting", "light bleeding",
        "leg pain", "leg ache", "abdominal pain", "stomach pain", "pelvic pain", "muscle aches", "muscle pain",
        "joint pain", "swollen ankles", "swelling", "weight gain", "gaining weight", "dry skin", "skin dryness",
        "hair loss", "losing hair", "tender gums", "gum pain", "mood swings", "mood swing", "irritability", "irritable",
        "anxiety", "anxious", "depression", "depressed", "overwhelmed", "overwhelming", "stressed", "stress", "sadness",
        "sad", "anger", "angry", "frustration", "frustrated", "low energy", "tiredness", "moodiness", "moody",
        "emotional", "feeling emotional", "tearfulness", "teary", "sensitivity", "sensitive", "restlessness",
        "restless", "lack of focus", "unfocused", "low motivation", "unmotivated", "period", "menstruation",
        "menstrual cycle", "cycle", "pms", "premenstrual syndrome", "pmdd", "premenstrual dysphoric disorder", "flow",
        "bleeding"
    ]
    matched_word = next((word for word in trigger_words if word in user_input.lower()), None)
    if matched_word:
        # Map matched word to the base form in audio_options
        base_forms = {
            "pains": "pain", "hurting": "pain", "aching": "ache", "cramping": "cramps", "uncomfortable": "discomfort",
            "aches": "ache", "tired": "fatigue", "exhausted": "fatigue", "soreness": "sore", "bloated": "bloating",
            "feeling bloated": "bloating", "felt bloated": "bloating", "headaches": "headache", "backaches": "backache",
            "nauseous": "nausea", "threw up": "vomiting", "loose stool": "diarrhea", "constipated": "constipation",
            "sore breasts": "breast tenderness", "breakouts": "acne", "craving food": "food cravings", "can't sleep": "insomnia",
            "dizzy": "dizziness", "hot flash": "hot flashes", "heavy flow": "heavy bleeding", "irregular cycle": "irregular periods",
            "light bleeding": "spotting", "leg ache": "leg pain", "stomach pain": "abdominal pain", "muscle pain": "muscle aches",
            "swelling": "swollen ankles", "gaining weight": "weight gain", "skin dryness": "dry skin", "losing hair": "hair loss",
            "gum pain": "tender gums", "mood swing": "mood swings", "irritable": "irritability", "anxious": "anxiety",
            "depressed": "depression", "overwhelming": "overwhelmed", "stress": "stressed", "sad": "sadness", "angry": "anger",
            "frustrated": "frustration", "tiredness": "low energy", "moody": "moodiness", "feeling emotional": "emotional",
            "teary": "tearfulness", "sensitive": "sensitivity", "restless": "restlessness", "unfocused": "lack of focus",
            "unmotivated": "low motivation", "premenstrual syndrome": "pms", "premenstrual dysphoric disorder": "pmdd"
        }
        base_word = base_forms.get(matched_word, matched_word)
        audio_text = random.choice(audio_options.get(base_word))
        voice_path = generate_voice_support.invoke({"text": audio_text})
        response = response.replace("/tmp/voice_support_file.mp3", "").replace("/tmp/calm_audio.mp3", "").replace("voice_support.mp3", "").replace("/audio", "").replace("[/audio]", "").strip()

    return {
        "text_response": response,
        "quote": quote,
        "voice_support": voice_path
    }