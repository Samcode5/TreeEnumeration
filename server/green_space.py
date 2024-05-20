import numpy as np
import matplotlib.pyplot as plt
import cv2
from skimage import io
from PIL import Image
import os
import sys
import json


# image = cv2.imread('img.png')
# plt.imshow(image)

class ImageSeg:
     #Initializing the path of image and threshold value by taking as class parameters
        
     #error here values are getting converted into decimals    
    def __init__(self,path,threshold):
        self.path = path
        self.img = np.array(Image.open(path))
        self.threshold = threshold 
      
    #Visualize the raw rgb image 
    def visualize_rgb(self):
        rgb_img = self.img
        plt.imshow(rgb_img)
        
    def green_percentage(self):
        green,non_green,total=self.PixelCount()
        return (green*100)/total
    
    #Nullify the R and B values in the image matrix 
    def RGNull(self):
        arr = np.array(self.img)
        for i in range(len(arr)):
            for j in range(len(arr[i])):
                arr[i][j][0]=0
                arr[i][j][2]=0
        return arr 
        
    #Grayscale the image
    def IsoGray(self):
        RGNull_img = self.RGNull()
        gray_img = cv2.cvtColor(RGNull_img,cv2.COLOR_BGR2GRAY)
        return gray_img
       
    #Apply Thresholding 
    def IsoGrayThresh(self):
        
        gray_img = self.IsoGray()
        for i in range(len(gray_img)):
            for j in range(len(gray_img[i])):
                if gray_img[i][j]>self.threshold:
                    gray_img[i][j]=255
                else:
                    gray_img[i][j]=0
                    
        plt.imshow(gray_img)
        return gray_img
    
    def calculate_histogram(self):
        gray_img=self.IsoGray()
        histogram = cv2.calcHist([gray_img], [0], None, [256], [0, 256])
        plt.figure(figsize=(8, 6))
        plt.plot(histogram, color='black')
        plt.xlabel('Pixel Intensity')
        plt.ylabel('Frequency')
        plt.title('Histogram of Pixel Intensities')
        plt.grid(True)
        plt.show()
    
    #Comparison b/w raw rgb, grayscaled and thresholded images
    def visualize_compare(self):
        fig = plt.figure(figsize=(14, 30))
        row = 1 
        cols = 2
        fig.add_subplot(row,cols,1)
        io.imshow(self.img)
        fig.add_subplot(row,cols,2)
        io.imshow(self.IsoGray())
        fig.add_subplot(row,cols,2)
        io.imshow(self.IsoGrayThresh())
        plt.show()
        
    #Function to count the tree pixels in the thresholded image 
    def PixelCount(self):
        green = 0
        non_green=0
        arr = self.IsoGrayThresh()
        for i in arr:
            for j in i:
                if j==0:
                    green+=1
                elif j!=0:
                    non_green+=1
        return green,non_green,arr.size
    
    def otsu_threshold(self):
        # Convert image to grayscale
        gray_img = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)

        # Calculate histogram
        hist = cv2.calcHist([gray_img], [0], None, [256], [0, 256])

        # Normalize histogram to obtain probabilities
        hist_norm = hist.ravel() / hist.sum()

        # Calculate cumulative sum and cumulative mean
        cumsum = np.cumsum(hist_norm)
        cummean = np.cumsum(hist_norm * np.arange(256))

        # Calculate intra-class variance for all thresholds
        variance = np.zeros(256)
        for t in range(1, 256):
            w0 = cumsum[t]
            w1 = 1 - w0
            if w0 == 0 or w1 == 0:
                continue
            mean0 = cummean[t] / w0
            mean1 = (cummean[-1] - cummean[t]) / w1
            variance[t] = w0 * w1 * (mean0 - mean1) ** 2

            # Find optimal threshold that minimizes intra-class variance
        optimal_threshold = np.argmax(variance)

        return optimal_threshold
    
    

       



# thresh=40
# print("Calculating the green Space...")
# img_path = "D:\\Projects\\Tree_Enumeration\\client\\public\\test_images\\1.png" 
# obj = ImageSeg(img_path,thresh)
# obj.IsoGrayThresh()
# green_percentage=round(obj.green_percentage(),2)
# print(green_percentage)
# obj.visualize_compare()
# save_dir = "D:\\Projects\\Tree_Enumeration\\client\\public\\GreenSpaceResult\\"
# save_path = os.path.join(save_dir, "result.png")
# plt.savefig(save_path)

def main():
    input_data = sys.stdin.read().strip()
    if input_data:
        img_name = input_data
        img_path = os.path.join("D:\\Projects\\Tree_Enumeration\\client\\public\\test_images\\", img_name)
        thresh = 50  # Assuming a fixed threshold value
        # save_path = os.path.join("D:\\Projects\\Tree_Enumeration\\frontend\\public\\GreenSpaceResult\\", "result.png")

        print("Calculating the green space...")
        obj = ImageSeg(img_path, thresh)
        obj.IsoGrayThresh()
        # plt.savefig(save_path)
        green_percentage = round(obj.green_percentage(), 2)
        print(green_percentage)
    else:
        print("No image name received")

if __name__ == "__main__":
    main()

