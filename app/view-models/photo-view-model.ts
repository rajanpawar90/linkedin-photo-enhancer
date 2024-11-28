import { Observable, knownFolders, path } from '@nativescript/core';
import { PhotoService } from '../services/photo-service';

export class PhotoViewModel extends Observable {
  private photoService: PhotoService;
  private _imagePath: string;
  private _isProcessing: boolean;

  constructor() {
    super();
    this.photoService = new PhotoService();
    this._imagePath = '';
    this._isProcessing = false;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    if (this._imagePath !== value) {
      this._imagePath = value;
      this.notifyPropertyChange('imagePath', value);
    }
  }

  get isProcessing(): boolean {
    return this._isProcessing;
  }

  set isProcessing(value: boolean) {
    if (this._isProcessing !== value) {
      this._isProcessing = value;
      this.notifyPropertyChange('isProcessing', value);
    }
  }

  async onSelectPhoto() {
    try {
      this.isProcessing = true;
      const selectedAsset = await this.photoService.selectPhoto();
      
      if (selectedAsset) {
        const enhancedImage = await this.photoService.enhancePhoto(selectedAsset);
        if (enhancedImage) {
          // Save the enhanced image and update the UI
          const documents = knownFolders.documents();
          const fileName = `enhanced_${Date.now()}.jpg`;
          const filePath = path.join(documents.path, fileName);
          
          enhancedImage.saveToFile(filePath, "jpg");
          this.imagePath = filePath;
        }
      }
    } catch (error) {
      console.error('Error processing photo:', error);
    } finally {
      this.isProcessing = false;
    }
  }
}