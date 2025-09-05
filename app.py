from fastapi import FastAPI, Query
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from chatbot_agent import handle_query
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
def serve_html():
    try:
        return FileResponse("index.html", media_type="text/html")
    except FileNotFoundError:
        return JSONResponse(content={"error": "index.html not found"}, status_code=404)

@app.get("/favicon.ico")
def get_favicon():
    return JSONResponse(content={}, status_code=204)

@app.get("/chat")
def chat(query: str = Query(default=""), faith: str = Query(default="general")):
    if not query.strip():
        return JSONResponse(
            content={
                "text_response": "Please provide a question about menstrual health.",
                "quote": "Your strength is within you. - General Wisdom",
                "voice_support": None
            },
            status_code=200
        )
    try:
        result = handle_query(query, faith)
        return result
    except Exception as e:
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
        if not os.path.exists("voice_support.mp3"):
            return JSONResponse(
                content={"error": "Audio file not available. Try a query with 'pain', 'overwhelmed', or 'stressed' first."},
                status_code=404
            )
        return FileResponse('voice_support.mp3', media_type='audio/mpeg')
    except Exception as e:
        return JSONResponse(content={"error": f"Failed to serve audio: {str(e)}"}, status_code=500)