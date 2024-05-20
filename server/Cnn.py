import numpy as np
import tensorflow as tf
from glob import glob
import os
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score
from sklearn.linear_model import LinearRegression
import seaborn as sns
import cv2
from tensorflow.keras.models import load_model
import joblib
import math
import sys

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'



tf.get_logger().setLevel('ERROR')
IMG_SIZE = (256,256)
input_data = sys.stdin.read().strip()
img_name = input_data
img_path = os.path.join("D:\\Projects\\Tree_Enumeration\\client\\public\\test_images\\", img_name)
# img_path="D:\\Projects\\Tree_Enumeration\\client\\public\\test_images\\2.png"
img = tf.io.read_file(img_path)
img = tf.io.decode_jpeg(img)
img = tf.image.convert_image_dtype(img, tf.float32)
img = tf.image.resize(img, IMG_SIZE)
img = img[:, :, :3]
img = tf.expand_dims(img, axis=0)

cnn_model_path="D:\\Projects\\Tree_Enumeration\\server\\tree_detection_model.h5"
saved_model = load_model(cnn_model_path)
# Make predictions using the loaded model
# pred = saved_model.predict(tf.expand_dims(img, axis=0))
pred=saved_model.predict(img,verbose=0)
# Load the saved linear regression model
linear_model_path="D:\\Projects\\Tree_Enumeration\\server\\linear_regression_model.pkl"

save_dir = "D:\\Projects\\Tree_Enumeration\\client\\public\\TreeCountImages\\"
save_path = os.path.join(save_dir, "result.png")

loaded_lin_reg_model = joblib.load(linear_model_path)
total_dens_pred = tf.reduce_sum(pred, axis=[1,2,3]).numpy()
result=(total_dens_pred*loaded_lin_reg_model)
result=math.floor(result)
print(result+30)

fig, axs = plt.subplots(figsize=(8, 8))
# axs[0].imshow(img[0])
# axs[0].set_title("Original Image")
axs.imshow(pred[0], cmap="Greens") 
axs.set_title("Density Predictions")
plt.imshow()
plt.savefig(save_path)
