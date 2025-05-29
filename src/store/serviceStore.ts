import{create} from "zustand/react";
import {httpsCallableFromURL} from "firebase/functions";
import {functions, FirebaseConfig} from "../config/firebase-config.ts";

export interface serviceStore{
    hellofireWorld: (payload:void) => Promise<string>;

}
 export const useServiceStore = create<serviceStore>(() => ({
    hellofireWorld: async ():Promise<string> => {
        try {
            const callable = httpsCallableFromURL<void, string>(
                functions,
                FirebaseConfig.getallFunctions().helloFireWorld
            )
            const response = await callable();
            console.log("response", response);
            return response.data;

        }catch (error) {
            throw new Error(`Hello Fire World failed with error: ${error}`);
        }

    },

}))

