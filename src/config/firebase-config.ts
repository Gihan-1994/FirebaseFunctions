import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";

type AllCloudFunctions = {
    helloFireWorld: string,
    api: string,
}

export abstract class FirebaseConfig {
    public static webFirebaseConfig: {
        apiKey: string,
        authDomain: string,
        projectId: string,
        storageBucket: string,
        messagingSenderId: string,
        appId: string
    } = {
        apiKey: "AIzaSyDj95U7PfpWm6QfVR0hGimyqLrDa8IHrDY",
        authDomain: "fir-authentication-efa08.firebaseapp.com",
        projectId: "fir-authentication-efa08",
        storageBucket: "fir-authentication-efa08.firebasestorage.app",
        messagingSenderId: "108247046362",
        appId: "1:108247046362:web:606dab3aeddc10ee2a6de3"

    }

    public static getallFunctions(): AllCloudFunctions {
        return {
            helloFireWorld: "http://127.0.0.1:5001/fir-authentication-efa08/us-central1/helloFireWorld",
            api: "http://127.0.0.1:5001/fir-authentication-efa08/us-central1/uploadImageMulter",
        }
    }
}

export const firebaseApp = initializeApp(FirebaseConfig.webFirebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const functions = getFunctions(firebaseApp);


