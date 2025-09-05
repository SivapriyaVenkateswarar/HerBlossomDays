import os
import warnings
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
    Answer factually and empathetically in a concise manner.
    Always append a motivational quote using the get_motivational_quote tool.
    If the user seems stressed (e.g., mentions 'pain', 'overwhelmed'), use generate_voice_support to provide calming audio at /audio.
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
    if any(word in user_input.lower() for word in ["pain", "overwhelmed", "stressed"]):
        voice_path = generate_voice_support.invoke({"text": "Take a deep breath. You are not alone."})
        response = response.replace("/tmp/voice_support_file.mp3", "/audio").replace("/tmp/calm_audio.mp3", "/audio").replace("voice_support.mp3", "/audio")

    return {
        "text_response": response,
        "quote": quote,
        "voice_support": voice_path
    }