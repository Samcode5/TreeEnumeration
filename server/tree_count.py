import pymongo
import base64
import re 
# MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://sameer:sameer@cluster0.ad7klvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client["test"]
collection = db["images"]

def extract_images():
    try:
        # Query the collection to get the latest image
        latest_image = collection.find_one({}, sort=[('_id', pymongo.DESCENDING)])
        if latest_image:
            image_data = latest_image.get('myfile')
            return image_data
        else:
            print("No images found in MongoDB.")
            return None
    except Exception as e:
        print(f"Error extracting images: {e}")
        return None
    
def decode_base64_with_padding(encoded_data):
    # Ensure correct base64 padding
    missing_padding = len(encoded_data) % 4
    if missing_padding != 0:
        encoded_data += b'=' * (4 - missing_padding)
    return base64.b64decode(encoded_data)

def save_image(image_data, file_path):
    try:
    
       # Decode base64 image data with correct padding
        decoded_image = decode_base64_with_padding(image_data)

        # Save the image data to a file
        with open(file_path, "wb") as f:
            f.write(decoded_image)
        print("Image saved successfully.")
    except Exception as e:
        print(f"Error saving image: {e}")

if __name__ == "__main__":
    print("Calculating tree count")
    image_data = extract_images()
    if image_data:
        save_image(image_data.encode(), "extracted_image.jpg")
    else:
        print("No image data retrieved.")
