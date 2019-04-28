import { collectionData, docData } from "rxfire/firestore";
import { firestore, storage } from "../firebase";
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

  updateUser(uid: string, payload: Partial<User>) {
    return firestore.doc(`users/${uid}`).set(payload, { merge: true });
  }

  async updateUserPhoto(uid: string, file: File) {
    try {
      const uploadRef = storage.ref().child(`users/${uid}/${file.name}`);
      const uploadTask = await uploadRef.put(file);
      const photoURL = await uploadTask.ref.getDownloadURL();
      console.log(photoURL);
      await firestore.doc(`users/${uid}`).update({ photoURL });
      console.log("Upload was successful, and photoURL saved to firestore.");
    } catch (error) {
      console.log(error.code, error.message);
    }
  }
}

export const userSvc = new UserService();
