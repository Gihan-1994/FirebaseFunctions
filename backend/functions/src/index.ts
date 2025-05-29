import { initializeApp } from "firebase-admin/app";
import {writeToFirestore} from "./functions/firestoreFunction";
import {uploadImage} from "./functions/storageFunctions";
import {helloFireWorld} from "./functions/helloFunction";
import {emailSignupFunction} from "./functions/emailSignupFunction";

initializeApp();
export { emailSignupFunction };
export { writeToFirestore };
export { uploadImage };
export { helloFireWorld };