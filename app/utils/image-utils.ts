import { ImageSource } from '@nativescript/core';

export const saveImage = async (imageSource: ImageSource, quality = 90): Promise<boolean> => {
  try {
    return await imageSource.saveToFile(`enhanced_${Date.now()}.jpg`, 'jpg', quality);
  } catch (error) {
    console.error('Error saving image:', error);
    return false;
  }
};

export const validateImage = (imageSource: ImageSource): boolean => {
  return imageSource && imageSource.height > 0 && imageSource.width > 0;
};