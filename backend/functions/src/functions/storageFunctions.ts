
import { onRequest } from "firebase-functions/v2/https";
import { getStorage } from "firebase-admin/storage";
import cors from "cors";



const corsHandler = cors({ origin: true });

export const uploadImage = onRequest(
    { maxInstances: 10 },
    (request, response) => {
        corsHandler(request, response, async () => {
            if (request.method !== "POST") {
                response.status(405).send("Method Not Allowed");
                return;
            }

            try {
                const bucket = getStorage().bucket();
                const file = request.rawBody;

                if (!file) {
                    response.status(400).send("No file provided");
                    return;
                }

                // Get filename from headers or generate one
                const filename = request.headers["x-filename"] as string || `image-${Date.now()}.jpg`;
                const fileRef = bucket.file(`images/${filename}`);

                // Upload file
                await fileRef.save(file, {
                    metadata: {
                        contentType: request.headers["content-type"] || "image/jpeg",
                    },
                });

                // Get download URL (for emulator, this will be a local URL)
                // const [url] = await fileRef.getSignedUrl({
                //     action: "read",
                //     expires: "03-09-2491", // Far future date
                // });
                // console.log("😎Image URL:", url);

                response.status(200).json({
                    success: true,
                    url:`gs://fir-authentication-efa08.firebasestorage.app/images/${filename}`,
                    filename,
                    message: "😄Image uploaded successfully",
                });
            } catch (error) {
                console.error("Upload error:", error);
                response.status(500).json({
                    success: false,
                    error: "Upload failed",
                });
            }
        });
    }
);