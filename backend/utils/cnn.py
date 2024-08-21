import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import functools

def compare(rect1, rect2):
    if abs(rect1[1] - rect2[1]) > 10:
        return rect1[1] - rect2[1]
    else:
    
        return rect1[0] - rect2[0]

def preprocess_character(character_image):
    resized_image = cv2.resize(character_image, (60, 60))
    normalized_image = resized_image.astype("float32") / 255.0
    expanded_image = np.expand_dims(normalized_image, axis=-1)  # Add channel dimension
    expanded_image = np.expand_dims(expanded_image, axis=0)  # Add batch dimension
    return expanded_image

async def get_character(image_path, type):
    # Use os.path.abspath to get the absolute path
    full_image_path = os.path.abspath(os.path.join("result", image_path.lstrip("/")))
    # Check if the file exists
    if not os.path.exists(full_image_path):
        raise FileNotFoundError(f"The image file at {full_image_path} does not exist.")
    
    # Read the image from the absolute path
    image_file = cv2.imread(full_image_path)
    
    # Convert image to grayscale
    gray = cv2.cvtColor(image_file, cv2.COLOR_BGR2GRAY)

    # Apply binary thresholding to get a binary image
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

    # Perform connected component analysis with stats
    output = cv2.connectedComponentsWithStats(thresh, 4, cv2.CV_32S)
    (numLabels, labels, stats, centroids) = output

    # Load the model using an absolute path
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'modal.keras'))
    model = load_model(model_path)

    # Mapping from predicted label index to character
    label_to_char = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: "Ba",
        11: "Ga",
        12: "Kha",
        13: "Lu",
        14: "Na",
        15: "Pa"
    }

    final_text = ""
    components = []

    # Iterate through each component found
    for i in range(1, numLabels):  # Start from 1 to skip the background
        x = stats[i, cv2.CC_STAT_LEFT]
        y = stats[i, cv2.CC_STAT_TOP]
        w = stats[i, cv2.CC_STAT_WIDTH]
        h = stats[i, cv2.CC_STAT_HEIGHT]
        area = stats[i, cv2.CC_STAT_AREA]

        if type == "image":
            keepWidth = lambda w: 40 < w < 200
            keepHeight = lambda h: 50 < h < 170
            keepArea = lambda area: area > 1500
        else:  # If it's a video
            keepWidth = lambda w: 10 < w < 50        
            keepHeight = lambda h: 10 < h < 40       
            keepArea = lambda area: area > 100  

        # Filter out components based on width, height, and area
        if all([keepWidth(w), keepHeight(h), keepArea(area)]):
            print(x,y,w,h, area)
            # Extract the character ROI
            character = image_file[y:y+h, x:x+w]
            # Store the component with its centroid, stats, and character image
            components.append((x, y, w, h, character))
    
    components = sorted(components, key=functools.cmp_to_key(compare))

    # Iterate through sorted components
    for x, y, w, h, character in components:
        # Preprocess the character image using the concept from preprocess_image
        preprocessed_character = preprocess_character(character)

        # Predict the character using the model
        prediction = model.predict(preprocessed_character)
        predicted_label = np.argmax(prediction, axis=1)[0]
        predicted_char = label_to_char[predicted_label]
        print(predicted_label, predicted_char)
        final_text += str(predicted_char)

    return {"text": final_text}

cv2.destroyAllWindows()