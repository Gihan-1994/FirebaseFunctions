import {FirebaseConfig} from "../config/firebase-config.ts";
export interface FireStoreWriteResponse {
success: boolean;
id?: string;
message?: string;
error?: string
}

export interface UserData {
    name: string;
    age: string;
    city: string;
}
export const fireStoreService = async (id: string , userData: UserData) : Promise<FireStoreWriteResponse> => {
    try {
        const response = await fetch(FirebaseConfig.getallFunctions().fireStoreFunction,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id, ...userData})
            })
        const result : FireStoreWriteResponse = await response.json();
        if(result.success) {
        console.log('Firestore Write Successful', result);
        return result;
        }else {
            throw new Error(result.message || "Firestore Write Failed");
        }
    } catch (error) {
            return Promise.reject('✂😥 Error writing to Firestore: ' + error);
    }
}