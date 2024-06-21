from ultralytics import YOLO
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
model = YOLO(f"{dir_path}/output/yolov82/weights/best.pt")


res = model.predict('/home/zephyr/Downloads/ss.jpg', project='result', name='yolo', save=True, exist_ok=True)
res = res[0]
print(res)






