
import cv2
import numpy as np


def white_to_transparent(input_filename, output_filename):
    # Load the image
    img = cv2.imread(input_filename, cv2.IMREAD_UNCHANGED)

    # Check if the image has an alpha channel, if not, convert it to RGBA
    if img.shape[2] < 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)

    # Create a mask for the white pixels
    white_mask = np.all(img[..., :3] == [255, 255, 255], axis=-1)

    # Make the white pixels transparent by setting the alpha channel to 0
    img[white_mask] = [255, 255, 255, 0]

    # Save the output image
    cv2.imwrite(input_filename, cv2.cvtColor(img, cv2.COLOR_RGBA2BGRA))


def image_to_draw(input_filename):
    # load the image
    img = cv2.imread('{}.jpeg'.format(input_filename))

    # convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # apply adaptive thresholding to create a black and white image with clear edges
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 4)

    # invert the colors of the image to make the lines white on a black background
    thresh = cv2.bitwise_not(thresh)

    # convert the color to RGBA
    img_rgba = cv2.cvtColor(thresh, cv2.COLOR_GRAY2RGBA)

    # create a mask of the original image
    mask = np.all(img_rgba == [0, 0, 0, 255], axis=-1)

    # replace the original color with the new color
    img_rgba[mask] = [108, 69, 27, 0]

    # convert the color back to BGR
    img_bgr = cv2.cvtColor(img_rgba, cv2.COLOR_RGBA2BGR)

    cv2.imwrite('{}.png'.format(input_filename), img_bgr)


if __name__ == '__main__':
    image_name = 'oi_side'

    image_to_draw(image_name)
    white_to_transparent('{}.png'.format(image_name),
                         '{}.png'.format(image_name))
