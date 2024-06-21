from fastapi import UploadFile
import cv2
import numpy as np
import uuid
import shutil
from ultralytics import YOLO
import os

model = YOLO(f"{os.getcwd()}/output/yolov82/weights/best.pt")


async def upload_image(file: UploadFile):
    contents = await file.read()
    
    nparr = np.frombuffer(contents, np.uint8)
    
    # Decode the numpy array into an image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Use YOLO model to make a prediction and save the results
    res = model.predict(source=img, project='result', name='image', save=True, save_crop=True, conf=0.7)[0]
    print(res)
    return {"url": res.save_dir, "path": res.path}
    

async def upload_video(file: UploadFile):
    temp_filename = f"temp_{uuid.uuid4()}.mp4"
    
    # Save the uploaded video file temporarily
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

        
    # Use YOLO model to make a prediction and save the results
    res = model.predict(source=temp_filename, project='result', name='video', save=True, exist_ok=True, conf=0.7)[0]
    os.remove(temp_filename)
    print('Removed the video also')
    video_path = res.path.split('/')[-1].replace('.mp4', '.avi')
    return {"url": res.save_dir, "path": video_path}


