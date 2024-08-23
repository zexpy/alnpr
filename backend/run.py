from fastapi import FastAPI, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from utils.uploads import upload_image, upload_video_by_frame
from utils.cnn import get_character
from pydantic import BaseModel
from database import create_connection, increment_detections, increment_recognitions, get_stats


app = FastAPI()

app.mount('/result', StaticFiles(directory='result'), 'result')

origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/uploads")
async def create_check(file: UploadFile, _: Request):
    if file.content_type is None:
        return

    path = file.content_type.split("/")[0]
    result = None
    if path == 'image':
        result = await upload_image(file)
    else:
        result = await upload_video_by_frame(file)
    
    if result and not result.get("error"):
        conn = create_connection()
        increment_detections(conn)
        if conn:
            conn.close()
    
    return result

class ImageRequest(BaseModel):
    image: str


@app.post("/character/recognition")
async def recognize_character(request: Request):
    data = await request.json()
    image = data['image']
    type = data['type']
    result = await get_character(image, type)
    
    conn = create_connection()
    increment_recognitions(conn)
    if conn:
        conn.close()
    
    return result

@app.get("/stats")
async def get_detection_stats():
    conn = create_connection()
    stats = get_stats(conn)
    if conn: 
        conn.close()
    return {"detections": stats[0], "recognitions": stats[1]}
