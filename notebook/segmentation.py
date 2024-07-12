import cv2
import os

# Load the image
image_path = 'try.jpg'
img = cv2.imread(image_path)

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply thresholding to get a binary image
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Sort contours from left to right
contours = sorted(contours, key=lambda ctr: cv2.boundingRect(ctr)[0])

# Directory to save segmented characters
output_dir = 'result'
os.makedirs(output_dir, exist_ok=True)

# Loop over contours to extract and resize each character
for i, ctr in enumerate(contours):
    x, y, w, h = cv2.boundingRect(ctr)
    char_img = binary[y:y+h, x:x+w]
    char_img = cv2.resize(char_img, (60, 60))
    # Save each character image
    char_img_path = os.path.join(output_dir, f'char_{i}.png')
    cv2.imwrite(char_img_path, char_img)

print(f'Segmented characters saved to {output_dir}')

