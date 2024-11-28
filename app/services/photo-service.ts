import { ImageSource, ImageAsset } from '@nativescript/core';
import { ImagePicker } from '@nativescript/imagepicker';
import { PhotoEnhancementService } from './photo-enhancement.service';

export class PhotoService {
  private imagePicker: ImagePicker;
  private enhancementService: PhotoEnhancementService;

  constructor() {
    this.imagePicker = new ImagePicker();
    this.enhancementService = new PhotoEnhancementService();
  }

  async selectPhoto(): Promise<ImageAsset | null> {
    try {
      const selection = await this.imagePicker.authorize();
      if (selection) {
        const imageAssets = await this.imagePicker.present();
        if (imageAssets && imageAssets.length > 0) {
          return imageAssets[0];
        }
      }
      return null;
    } catch (error) {
      console.error('Error selecting photo:', error);
      return null;
    }
  }

  async enhancePhoto(imageAsset: ImageAsset): Promise<ImageSource | null> {
    try {
      let imageSource = await ImageSource.fromAsset(imageAsset);
      
      // Apply basic portrait enhancement
      imageSource = this.enhancementService.enhancePortrait(imageSource);
      
      // Apply professional effects
      imageSource = await this.enhancementService.applyProfessionalEffects(imageSource);
      
      return imageSource;
    } catch (error) {
      console.error('Error enhancing photo:', error);
      return null;
    }
  }
}