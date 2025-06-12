import { initializeApp } from "firebase/app";

import { getStorage , connectStorageEmulator } from "firebase/storage";


export abstract class FirebaseConfig {
    public static webFirebaseConfig:{apiKey: string, authDomain: string, projectId: string , storageBucket: string, messagingSenderId: string, appId: string} = {
        apiKey: "AIzaSyDj95U7PfpWm6QfVR0hGimyqLrDa8IHrDY",
        authDomain: "fir-authentication-efa08.firebaseapp.com",
        projectId: "fir-authentication-efa08",
        storageBucket: "fir-authentication-efa08.firebasestorage.app",
        messagingSenderId: "108247046362",
        appId: "1:108247046362:web:606dab3aeddc10ee2a6de3"

    }
}
export const firebaseApp = initializeApp(FirebaseConfig.webFirebaseConfig);


export const storage = getStorage(firebaseApp);
connectStorageEmulator(storage, "127.0.0.1", 9199);