from fastapi import FastAPI, Query
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORSMiddleware with strict headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
def serve_html():
    try:
        with open("index.html", "rb") as f:
            content = f.read()
            logger.debug(f"Serving index.html with {len(content)} bytes")
        return FileResponse("index.html", media_type="text/html; charset=utf-8")
    except FileNotFoundError:
        logger.error("index.html not found")
        return JSONResponse(content={"error": "index.html not found"}, status_code=404)

@app.get("/favicon.ico")
def get_favicon():
    return JSONResponse(content={}, status_code=204)

@app.get("/chat")
def chat(query: str = Query(default=""), faith: str = Query(default="general")):
    if not query.strip():
        logger.debug("Empty query received")
        return JSONResponse(
            content={
                "text_response": "Please provide a question about menstrual health.",
                "quote": "Your strength is within you. - General Wisdom",
                "voice_support": None
            },
            status_code=200
        )
    try:
        from chatbot_agent import handle_query
        result = handle_query(query, faith)
        logger.debug(f"Chat response: {result}")
        return result
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        return JSONResponse(
            content={
                "text_response": f"Error processing query: {str(e)}",
                "quote": "Embrace your body’s natural cycle. - Health Wisdom",
                "voice_support": None
            },
            status_code=500
        )

@app.get("/audio")
def get_audio():
    try:
        file_path = os.path.join(os.getcwd(), "voice_support.mp3")
        if not os.path.exists(file_path):
            logger.error(f"voice_support.mp3 not found at {file_path}")
            return JSONResponse(
                content={"error": "Audio file not available. Try a query with 'pain', 'overwhelmed', or 'stressed' first."},
                status_code=404
            )
        file_size = os.path.getsize(file_path)
        logger.debug(f"Serving voice_support.mp3 with {file_size} bytes")
        return FileResponse(file_path, media_type='audio/mpeg')
    except Exception as e:
        logger.error(f"Failed to serve audio: {str(e)}")
        return JSONResponse(content={"error": f"Failed to serve audio: {str(e)}"}, status_code=500)