import os
import shutil
import cv2
from sklearn.model_selection import train_test_split

def split_dataset(src_dir, train_dir, test_dir, test_size=0.3, image_size=(32, 32)):
    # Create train and test directories if they don't exist
    os.makedirs(train_dir, exist_ok=True)
    os.makedirs(test_dir, exist_ok=True)
    
    # Get the list of all subdirectories (i.e., classes) in the source directory
    classes = [d for d in os.listdir(src_dir) if os.path.isdir(os.path.join(src_dir, d))]
    
    for cls in classes:
        class_src_dir = os.path.join(src_dir, cls)
        class_train_dir = os.path.join(train_dir, cls)
        class_test_dir = os.path.join(test_dir, cls)
        
        # Create class directories in train and test directories
        os.makedirs(class_train_dir, exist_ok=True)
        os.makedirs(class_test_dir, exist_ok=True)
        
        # List all images in the class directory
        all_images = [os.path.join(class_src_dir, f) for f in os.listdir(class_src_dir) if os.path.isfile(os.path.join(class_src_dir, f))]
        
        # Split the images into training and testing sets
        train_images, test_images = train_test_split(all_images, test_size=test_size, random_state=42)
        
        # Helper function to resize and save images
        def resize_and_save(images, dest_dir):
            for img_path in images:
                # Read the image
                image = cv2.imread(img_path)
                
                # Resize the image to the specified size
                resized_image = cv2.resize(image, image_size)
                
                # Save the resized image to the destination directory
                # Use os.path.basename to get the file name and save it
                dest_path = os.path.join(dest_dir, os.path.basename(img_path))
                cv2.imwrite(dest_path, resized_image)
        
        # Resize and save the images to the respective directories
        resize_and_save(train_images, class_train_dir)
        resize_and_save(test_images, class_test_dir)
        
        print(f"Class {cls}: {len(train_images)} images for training, {len(test_images)} images for testing")

# Example usage
src_directory = 'character_ocr'   # Path to the source dataset directory
train_directory = 'datasets/train'   # Path to save training data
test_directory = 'datasets/test'     # Path to save testing data

split_dataset(src_directory, train_directory, test_directory)
