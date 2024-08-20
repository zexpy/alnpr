from ultralytics import YOLO
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
model = YOLO(f"{dir_path}/output/yolov82/weights/best.pt")


res = model.predict('/home/zephyr/Downloads/plate.mp4', project='result', name='yolo', save=True, exist_ok=True, suffix='.mp4')
res = res[0]
print(res)






