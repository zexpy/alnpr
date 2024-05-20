from ultralytics import YOLO

model = YOLO('/home/zephyr/Desktop/.code/college/alpr/results/yolov82/weights/best.pt')


res = model.predict('/home/zephyr/Downloads/ss.jpg', project='result', name='yolo', save=True, exist_ok=True)
res = res[0]
print(res)






