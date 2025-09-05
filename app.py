from fastapi import FastAPI, Query
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from chatbot_agent import handle_query

app = FastAPI()

app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/", response_class=HTMLResponse)
def serve_html():
    try:
        with open("index.html") as f:
            return HTMLResponse(content=f.read())
    except FileNotFoundError:
        return HTMLResponse(content="<h1>Error: index.html not found</h1>", status_code=404)

@app.get("/favicon.ico")
def get_favicon():
    return JSONResponse(content={}, status_code=204)  # No content for favicon

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
        return FileResponse('voice_support.mp3', media_type='audio/mpeg')
    except FileNotFoundError:
        return JSONResponse(content={"error": "Audio file not found"}, status_code=404)