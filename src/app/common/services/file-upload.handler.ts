import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import { FirebaseFcadeService } from "./firebase-facade.service";

@Injectable({
    providedIn: 'root'
  })
export class FileUploadHandler{
 
    constructor(private firebaseFcadeService: FirebaseFcadeService){}
private _currentUplodedFilesMap = new Map<string, any>();    


addItemToCurrentUplodedFilesMap(key, value){
    this._currentUplodedFilesMap.set(key, value);
}

getCurrentUplodedFilesMap(){
    return this._currentUplodedFilesMap;
}

uploadFile(image, quillInstanse){

    if (image) {
      const storageRef = this.firebaseFcadeService.getFirestoreReference.ref('/journal_images');
      //3.
      const imageRef = storageRef.child(image.name);
      //4.
      imageRef.put(image)
     //5.
     .then((dataF: any) => {

        const storageRef = this.firebaseFcadeService.getFirestoreReference.ref('/journal_images');
        //3.
        const imageRef = storageRef.child(image.name);
        //4.
        imageRef.getDownloadURL().then((dataS: any) => {
            this._currentUplodedFilesMap.set(dataF.metadata.name, {md5Hash: dataF.metadata.md5Hash, url:dataS});
            this.insertToEditor(dataS,quillInstanse);
         
            alert("Image uploaded successfully to Firebase.");
      });
        // alert("Image uploaded successfully to Firebase.");
    });
    } else {
      alert("Please upload an image first.");
    }
  }

  insertToEditor(url: string, quillInstanse) {
    // push image url to rich editor.
    const range = quillInstanse.getSelection();
    quillInstanse.insertEmbed(range.index, 'image', url);
  }
}