from fastapi import FastAPI, UploadFile
from ultralytics import YOLO
import numpy as np
import cv2
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles



app = FastAPI()

app.mount('/result', StaticFiles(directory='result'), 'result')
model = YOLO('/home/zephyr/Desktop/.code/college/alnpr/results/yolov82/weights/best.pt')


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/image")
async def create_upload_file(file: UploadFile):
    contents = await file.read()
    
    nparr = np.frombuffer(contents, np.uint8)
    
    # Decode the numpy array into an image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Use YOLO model to make a prediction and save the results

    res = model.predict(source=img, project='result', name='yolov8', save=True, save_crop=True)[0]
    return {"url": res.save_dir, "path": res.path}
    

