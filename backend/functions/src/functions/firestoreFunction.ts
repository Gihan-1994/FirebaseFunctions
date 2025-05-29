import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import cors from "cors";


const corsHandler = cors({ origin: true });
interface RequestData extends UserData {
    id: string;
}
interface UserData  {
    name: string;
    age: string;
    city: string;
}
export const writeToFirestore = onRequest(
    { maxInstances: 10 },
    (request, response) => {

        corsHandler(request, response, async () => {
            if (request.method !== "POST") {
                response.status(405).send("Method Not Allowed");
                return;
            }
            try{
                const db = getFirestore();
                const requestData : RequestData = request.body ;

                if(!requestData.id) {
                  response.status(400).send("No ID provided");
                  return;
                }
                const userData: UserData = {
                    name: requestData.name || "",
                    age: requestData.age || "",
                    city: requestData.city || "",
                };
                await db.collection("Users").doc(requestData.id).set(userData);
                response.status(200).json({
                    success: true,
                    id: requestData.id,
                    message: "😄Data written to Firestore successfully",
                });

            }catch (error) {
                console.error("Fire Store write error:", error);
                response.status(500).json({
                    success: false,
                    error: "Fire Store write failed",
                })
            }
        })
    }
)