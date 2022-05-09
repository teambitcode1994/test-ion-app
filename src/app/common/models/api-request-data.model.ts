import { FIREBASE_COLLECTION } from "../enums/firebase-collection.enum";
import { RequestMethodEnum } from "../enums/request-method.model";
import { AuthDataModel } from "./auth-data.model";

export class ApiRequestDataModel<T>{

    method: RequestMethodEnum;
    payload: T;
    collection: FIREBASE_COLLECTION;

}