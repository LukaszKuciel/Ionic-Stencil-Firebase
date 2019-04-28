import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const createUserAccount = functions
  .region("europe-west1")
  .runWith({ memory: "128MB", timeoutSeconds: 60 })
  .auth.user()
  .onCreate(e => {
    console.log("event: ", e);

    const user = {
      email: e.email,
      displayName: e.displayName,
      phoneNumber: e.phoneNumber,
      memberSince: e.metadata.creationTime,
      photoURL: e.photoURL,
      uid: e.uid,
      role: ["member"]
    };

    const userRef = db.doc(`users/${e.uid}`);
    return userRef.set(user);
  });
