import { Injectable, Injector } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase";
import { Observable } from "rxjs";
import { ApiRequestDataModel } from "../models/api-request-data.model";
import { APIResponseWrapper } from "../models/api-response.wrapper";
import { AuthDataModel } from "../models/auth-data.model";
import { FirebaseAuthService } from "./firebase-auth.service";
import { FirebaseCrudService } from "./firebase-crud.service";

@Injectable({
    providedIn: 'root'
  })
export class FirebaseFcadeService{
    private _databaseReference: AngularFirestore;
    private _firebaseAuthService: FirebaseAuthService;
    private _firestoreReference: firebase.storage.Storage;
    private _firebaseCrudService: FirebaseCrudService;

    constructor(private injector: Injector) {
    }

    get getDatabaseReference(): AngularFirestore{
        if(!this._databaseReference){
          this._databaseReference = this.injector.get(AngularFirestore);
        }
        return this._databaseReference;
    }

    get getFirebaseAuthService(): FirebaseAuthService{
        if(!this._firebaseAuthService){
          this._firebaseAuthService = this.injector.get(FirebaseAuthService);
        }
        return this._firebaseAuthService;
    }

    get getFirestoreReference(): firebase.storage.Storage{
        if(!this._firestoreReference){
          this._firestoreReference = firebase.storage();
        }
        return this._firestoreReference;
    }

    get getFirebaseCrudService(): FirebaseCrudService{
        if(!this._firebaseCrudService){
          this._firebaseCrudService = this.injector.get(FirebaseCrudService);
        }
        return this._firebaseCrudService;
    }

    async saveItem<T>(requestData: ApiRequestDataModel<T>): Promise<any>{
        return this.getFirebaseCrudService.insertItem<T>(requestData, this.getDatabaseReference, );
    }


    setAuthData(requestData: any){
        if(requestData && requestData.payload){
            requestData.payload.author = this.getFirebaseAuthService.getAuthata();
        }
    }



}