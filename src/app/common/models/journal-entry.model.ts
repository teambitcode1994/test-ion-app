import { FirebaseAuthService } from "../services/firebase-auth.service";
import { AuthDataModel } from "./auth-data.model";

export class JournalEntry{
    shortTitle: string;
    tags: Array<string>;
    description: string;
    images: string[];
    author: AuthDataModel;

    constructor(private firebaseAuthService: FirebaseAuthService){
        const payload = JSON.parse(JSON.stringify(firebaseAuthService.getAuthata()));
        this.author = payload;
    }
}