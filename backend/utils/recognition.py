import numpy as np
def get_predicted_class(predictions, class_indices):
    # Get the index of the maximum value in predictions array
    predicted_index = np.argmax(predictions)
    
    # Reverse the class_indices dictionary to map indices to keys
    index_to_class = {v: k for k, v in class_indices.items()}
    
    # Get the predicted class key
    predicted_class = index_to_class[predicted_index]
    
    
    return predicted_class
