import {FirebaseConfig} from "../config/firebase-config.ts";

export interface UploadResponse {
    success: boolean;
    filename?: string;
    url?: string;
    message?: string;
    error?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {

try {
    const arrayBuffer = await file.arrayBuffer();

    // Call the Firebase Function directly via HTTP
    const response = await fetch(FirebaseConfig.getallFunctions().uploadImageFunction, {
        method: 'POST',
        headers: {
            'Content-Type': file.type,
            'X-Filename': file.name,
        },
        body: arrayBuffer,

    });
    const result: UploadResponse = await response.json();
    if (result.success) {
        console.log('Upload successful:', result);
        return result;
    } else {
        throw new Error(result.message || 'Unknown error occurred during upload.');
    }
  }catch (error) {
    return Promise.reject('✂😥Error uploading image: ' + error);
}

}