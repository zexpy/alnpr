from fastapi import FastAPI, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from utils.uploads import upload_image, upload_video_by_frame
from utils.cnn import get_character
from pydantic import BaseModel


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
    if path == 'image':
        return await upload_image(file)
    else:
        # return await upload_video(file)
        return await upload_video_by_frame(file)

class ImageRequest(BaseModel):
    image: str


@app.post("/recog")
async def recognize_character(request: ImageRequest):
    image_str = request.image
    return {"text": image_str}





