import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

# Path to the image and model
image_path = "image0.jpg"  # Use your uploaded image path
model_path = "recognition.keras"  # Replace with your model's path

# Load the image and convert to grayscale
image = cv2.imread(image_path)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply Gaussian blurring and adaptive thresholding
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
thresh = cv2.adaptiveThreshold(blurred, 255,
    cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 45, 15)

# Perform connected components analysis
_, labels = cv2.connectedComponents(thresh)
mask = np.zeros(thresh.shape, dtype="uint8")

# Set lower and upper bounds for character size (adjust these if necessary)
total_pixels = image.shape[0] * image.shape[1]
lower = total_pixels // 80  # Adjusted for Nepali characters
upper = total_pixels // 15  # Adjusted for Nepali characters

# Loop through components and create a mask for the characters
for (i, label) in enumerate(np.unique(labels)):
    if label == 0:  # Background label, ignore it
        continue
    labelMask = np.zeros(thresh.shape, dtype="uint8")
    labelMask[labels == label] = 255
    numPixels = cv2.countNonZero(labelMask)
    if lower < numPixels < upper:
        mask = cv2.add(mask, labelMask)

# Find contours and get bounding boxes
cnts, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
boundingBoxes = [cv2.boundingRect(c) for c in cnts]

# Sort the bounding boxes (Nepali characters tend to be on one line, so sorting by X is primary)
boundingBoxes = sorted(boundingBoxes, key=lambda b: b[0])

# Define constants according to your model's input size
TARGET_WIDTH = 128
TARGET_HEIGHT = 128

# Nepali characters map (replace with actual Nepali character map)
chars = ['ग', '१', '२', '३', '४', '५', '६', '७', '८', '९', 'प']

# Load the pre-trained convolutional neural network
model = load_model(model_path, compile=False)

vehicle_plate = ""

# Process each bounding box
for rect in boundingBoxes:
    x, y, w, h = rect
    crop = mask[y:y+h, x:x+w]
    crop = cv2.bitwise_not(crop)

    # Resize and pad the cropped image to match the model's expected input size
    rows, columns = crop.shape
    paddingY = (TARGET_HEIGHT - rows) // 2 if rows < TARGET_HEIGHT else 0
    paddingX = (TARGET_WIDTH - columns) // 2 if columns < TARGET_WIDTH else 0
    crop = cv2.copyMakeBorder(crop, paddingY, paddingY, paddingX, paddingX, cv2.BORDER_CONSTANT, value=(255,))
    
    # Ensure size matches TARGET_WIDTH and TARGET_HEIGHT
    crop = cv2.resize(crop, (TARGET_WIDTH, TARGET_HEIGHT))

    # Convert to RGB, normalize, and prepare for prediction
    crop = cv2.cvtColor(crop, cv2.COLOR_GRAY2RGB)
    crop = crop.astype("float32") / 255.0
    crop = img_to_array(crop)
    crop = np.expand_dims(crop, axis=0)

    # Initialize idx to handle cases where prediction might fail
    idx = None
    try:
        prob = model.predict(crop)[0]
        idx = np.argmax(prob)
    except Exception as e:
        print("Prediction error:", e)
    
    # Ensure idx is defined before using it
    if idx is not None:
        vehicle_plate += chars[idx]

        # Draw bounding box and prediction on the image
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(image, chars[idx], (x, y+15), 0, 0.8, (0, 0, 255), 2)
    else:
        print("No valid prediction for bounding box:", rect)

# Show final result
cv2.imshow('Final', image)
print("Vehicle plate: " + vehicle_plate)
cv2.waitKey(0)
cv2.destroyAllWindows()
