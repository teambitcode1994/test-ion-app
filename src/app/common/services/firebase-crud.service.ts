import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ApiRequestDataModel } from "../models/api-request-data.model";
import { AuthDataModel } from "../models/auth-data.model";
import { FirebaseCrudUtil } from "../util/firebase-crud.util";

@Injectable({
    providedIn: 'root'
  })
export class FirebaseCrudService{


    insertItem<T>(requestData: ApiRequestDataModel<T>, connection): Promise<any>{
        return FirebaseCrudUtil.send<T>(requestData, connection);
    }


}