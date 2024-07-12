import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import warnings
warnings.filterwarnings('ignore', message='not allowed')


class_indices = {
'0': 0,
 '1': 1,
 '2': 2,
 '3': 3,
 '4': 4,
 '5': 5,
 '6': 6,
 '7': 7,
 '8': 8,
 '9': 9,
 'ba': 10,
 'ga': 11,
 'pa': 12}

loaded_model = load_model('recognition.keras')


def preprocess_image(img_path):
    img = image.load_img(img_path, color_mode='grayscale', target_size=(60, 60))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0  # Rescale pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = np.expand_dims(img_array, axis=-1)  # Add channel dimension for grayscale
    return img_array


def predict_image_class(model, img_path, class_indices):
    img_array = preprocess_image(img_path)
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    class_labels = {v: k for k, v in class_indices.items()}
    predicted_class_label = class_labels[predicted_class_index]
    return predicted_class_label


result = predict_image_class(loaded_model, 'test.jpg', class_indices)
print(result)
