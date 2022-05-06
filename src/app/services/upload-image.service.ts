import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private baseURL = "http://localhost:8080/api/v1/product/create/image";

  filesToUpload: Array<File>

  constructor() {
    this.filesToUpload = [];
   }

  // upload(id: number){
  //   this.makeFileRequest("http://localhost:8080/api/v1/product/create/image?id="+id, [], this.filesToUpload).then((result) => {
  //       console.log(result);
  //   }, (error) =>{
  //     console.log(error);
  //   });
  // }
}
