import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { RequestMethodEnum } from "../enums/request-method.model";
import { ApiRequestDataModel } from "../models/api-request-data.model";
import { AuthDataModel } from "../models/auth-data.model";

export class FirebaseCrudUtil{

    public static send<T>(requestData: ApiRequestDataModel<T>, connection:AngularFirestore): Promise<any>{
        let firestoreConnection: Promise<any> = null;
        const payload = JSON.parse(JSON.stringify(requestData.payload));
        switch (requestData.method) {
            case RequestMethodEnum.GET:
                firestoreConnection = connection.collection(requestData.collection).add(payload);
                break;
            case RequestMethodEnum.POST:
                firestoreConnection = connection.collection(requestData.collection).add(payload);
                break;
            case RequestMethodEnum.DELETE:
                
            break;
            case RequestMethodEnum.PUT:
                
                break;
            default:
                break;
        }

        return firestoreConnection;

    }
}