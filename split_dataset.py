import os
import shutil
from sklearn.model_selection import train_test_split

def split_dataset(src_dir, train_dir, test_dir, test_size=0.3):
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
        
        # Copy the images to the respective directories
        for img in train_images:
            shutil.copy(img, class_train_dir)
        
        for img in test_images:
            shutil.copy(img, class_test_dir)
            
        print(f"Class {cls}: {len(train_images)} images for training, {len(test_images)} images for testing")

# Example usage
src_directory = 'character_ocr'   # Path to the source dataset directory
train_directory = 'datas/train' # Path to save training data
test_directory = 'datas/test'   # Path to save testing data

split_dataset(src_directory, train_directory, test_directory)

