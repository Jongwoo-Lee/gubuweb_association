// React
import app, { auth, firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { Association, setAscData, updateURL, ascConverter } from "./asc";
import { searchTeams } from "./team";

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
};

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
};

// TODO_JW: Prod config 추가
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

// Firebase Type, Interface Definition
export type FirebaseAuth = firebase.User | null;
export type FirebaseAsc = Association | null;

class Firebase {
  static auth: app.auth.Auth;
  static firestore: app.firestore.Firestore;
  static storage: firebase.storage.Storage;

  static persistence = auth.Auth.Persistence;
  static field = app.firestore.FieldValue;
  static arrayUnion = app.firestore.FieldValue.arrayUnion;
  static arrayRemove = app.firestore.FieldValue.arrayRemove;

  static init() {
    app.initializeApp(config);

    Firebase.auth = app.auth();
    Firebase.firestore = app.firestore();
    Firebase.storage = app.storage();
  }

  // Firebase Auth API
  static fireRegister = (
    email: string,
    password: string,
    username?: string,
    phoneNumber?: string
  ) =>
    Firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value: app.auth.UserCredential) => {
        if (value.user == null) throw new Error("user is null");
        const { user } = value;
        console.log("After register is complete" + user.email);
        let nameUpdate, userUpdate: Promise<void>;

        if (username) {
          nameUpdate = value.user.updateProfile({
            displayName: username
          });
        }

        userUpdate = setAscData(
          new Association(user.uid, username, email, false, phoneNumber)
        );

        return Promise.all([nameUpdate, userUpdate]);
      })
      .catch(err => {
        throw err;
      });

  static fireLogin = (email: string, password: string) =>
    Firebase.auth.signInWithEmailAndPassword(email, password);

  static fireLogout = () => {
    return Firebase.auth.signOut();
  };

  static firePasswordReset = (email: string) =>
    Firebase.auth.sendPasswordResetEmail(email);

  static firePasswordUpdate = (password: string) => {
    if (Firebase.auth.currentUser != null)
      Firebase.auth.currentUser.updatePassword(password);
  };

  static fireInfoUpdate = (
    asc: Association,
    email: string,
    username?: string,
    phoneNumber?: string,
    introduction?: string
  ) => {
    const userUpdate: FirebaseAsc = new Association(
      asc.uid,
      username,
      email,
      asc.isVerified,
      phoneNumber,
      asc?.url,
      introduction
    );
    Promise.resolve(setAscData(userUpdate));

    return userUpdate;
  };

  static fireURLUpdate = (asc: Association, url: string) => {
    const userUpdate: Association = new Association(
      asc.uid,
      asc.name,
      asc.email,
      asc.isVerified,
      asc.phoneNumber,
      url,
      asc.introduction
    );
    Promise.resolve(updateURL(asc.uid, url));

    return userUpdate;
  };

  static fireSearchTeams = (search: string) =>
    Promise.resolve(searchTeams(search));
}

export default Firebase;
