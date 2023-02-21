import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
  GalleryImageOptions,
} from '@capacitor/camera';

import {
  Camera as CordovaCamera,
  CameraOptions as CordovaCameraOptions,
} from '@awesome-cordova-plugins/camera/ngx';
import { AlertsService } from './alerts.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private camera: CordovaCamera,
    public alert: AlertsService,
    private file: File
  ) {}

  capture() {
    const options: CordovaCameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }

  getPhotos() {
    return new Promise<any>(async (resolve) => {
      let isCamera = await this.alert.presentConfirm(
        'Camera',
        'Gallery',
        'Select',
        'Please select source'
      );
      if (isCamera) {
        const res = await this.openCamera();
        resolve(res);
      } else {
        const res = await this.pickImages();
        resolve(res);
      }
    });
  }

  pickImages() {
    return new Promise((resolve) => {
      const galleryOptions: GalleryImageOptions = {
        limit: 0,
        quality: 100,
      };

      Camera.pickImages(galleryOptions).then(
        async (imageData) => {
          console.log('Gallery Images', imageData);
          let blobs = [];
          imageData.photos.forEach(async (x) => {
            let blob = await fetch(x.webPath).then((res) => res.blob());
            blobs.push(blob);
          });
          resolve({ isBase64: false, blobs });
        },
        (err) => {
          resolve(null);
        }
      );
    });
  }

  openCamera() {
    return new Promise((res) => {
      const cameraOptions: ImageOptions = {
        width: 200,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      };

      Camera.getPhoto(cameraOptions).then(
        (imageData) => {
          res({ ...imageData, isBase64: true });
        },
        (err) => {
          res(null);
        }
      );
    });
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    return new Promise(async (resolve) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      resolve(blob);
    });
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then((fileEntry) => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then((buffer) => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: 'image/jpeg',
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob,
          });
        })
        .catch((e) => {
          console.log('makeFileIntoBlob Error:', e);
          reject(e);
        });
    });
  }

  getUserImage(path) {
    return `${ApiService.BASE_URL}/uploads/profile-images/${path}`;
  }
}
