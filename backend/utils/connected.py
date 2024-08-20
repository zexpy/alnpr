import cv2
import argparse
import numpy as np
from tensorflow.keras.models import load_model

# Argument parsing
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="path to input image")
ap.add_argument("-m", "--model", required=True, help="path to model")
ap.add_argument("-t", "--type", help="type of input (image or video)")
args = vars(ap.parse_args())

# Load the image and process it
image_file = cv2.imread(args["image"])
gray = cv2.cvtColor(image_file, cv2.COLOR_BGR2GRAY)

# Apply binary thresholding to get a binary image
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

# Perform connected component analysis with stats
output = cv2.connectedComponentsWithStats(thresh, 4, cv2.CV_32S)
(numLabels, labels, stats, centroids) = output

# Load the model
model = load_model(args["model"])

# Mapping from predicted label index to character
label_to_char = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'ba',
    11: 'ga',
    12: 'pa'
}

final_text = ""

def preprocess_character(character_image):
    resized_image = cv2.resize(character_image, (60, 60))
    # cv2.imshow('character', resized_image)
    # cv2.waitKey(0)
    normalized_image = resized_image.astype("float32") / 255.0
    expanded_image = np.expand_dims(normalized_image, axis=-1)  # Add channel dimension
    expanded_image = np.expand_dims(expanded_image, axis=0)  # Add batch dimension
    return expanded_image

# Iterate through each component found
for i in range(1, numLabels):  # Start from 1 to skip the background
    # Extract the connected component statistics and centroid for the current label
    x = stats[i, cv2.CC_STAT_LEFT]
    y = stats[i, cv2.CC_STAT_TOP]
    w = stats[i, cv2.CC_STAT_WIDTH]
    h = stats[i, cv2.CC_STAT_HEIGHT]
    area = stats[i, cv2.CC_STAT_AREA]

    if args["type"] == "image":
        keepWidth = lambda w: 40 < w < 200
        keepHeight = lambda h: 50 < h < 170
        keepArea = lambda area: area > 1500
    else:  # If it's a video
        keepWidth = lambda w: 10 < w < 50        
        keepHeight = lambda h: 10 < h < 40       
        keepArea = lambda area: area > 100  

    # Filter out components based on width, height, and area
    if all([keepWidth(w), keepHeight(h), keepArea(area)]):
        # Extract the character ROI
        character = image_file[y:y+h, x:x+w]

        # Preprocess the character image using the concept from preprocess_image
        preprocessed_character = preprocess_character(character)

        # Predict the character using the model
        prediction = model.predict(preprocessed_character)
        predicted_label = np.argmax(prediction, axis=1)[0]
        predicted_char = label_to_char[predicted_label]
        final_text += str(predicted_char)

