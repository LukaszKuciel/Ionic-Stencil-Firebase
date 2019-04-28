import { collectionData, docData } from "rxfire/firestore";
import { firestore } from "../firebase";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class UserService {
  getUsers(): Observable<User[]> {
    return collectionData<User>(firestore.collection("users"), "id").pipe(
      tap(data => console.log("getUsers:", data))
    );
  }

  getUser(uid: string): Observable<User> {
    return docData<User>(firestore.doc(`/users/${uid}`)).pipe(
      tap(data => console.log("getUser:", data))
    );
  }
}

export const userSvc = new UserService();
