import { onRequest } from "firebase-functions/v2/https";
import { getAuth , FirebaseAuthError } from "firebase-admin/auth";

import cors from "cors";

const corsHandler = cors({ origin: true });

interface SignupRequest {
    email: string;
    password: string;
}

export const emailSignupFunction = onRequest(
    {maxInstances: 10},(request, response)=> {
        corsHandler(request, response, async () => {
            try {
                if(request.method !== 'POST') {
                    response.status(405).json({ success: false, message: "Method Not Allowed" });
                    return;
                }
                const { email, password } = request.body as SignupRequest;
                const user = await getAuth().createUser(
                    { email,
                        password
                    });
                response.status(200).json(
                    { success: true,
                    uid: user.uid,
                    email: user.email ,
                    message: "User created successfully",
                    });
            }catch (error) {
                console.error('Signup error',error);
                let errorMessage = "An error occurred";
                switch ((error as FirebaseAuthError).code) {
                    case "auth/email-already-exists":
                        errorMessage = "Email already in use";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password is too weak";
                        break;
                }
                response.status(400).json({
                    success: false,
                    error: errorMessage,
                    });
            }
        })
    }

)