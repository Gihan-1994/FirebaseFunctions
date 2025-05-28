import { FirebaseConfig } from "../config/firebase-config.ts";

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);


    try {
        const response = await fetch(FirebaseConfig.getallFunctions().api, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Upload failed with status ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Upload failed:', error);
        return Promise.reject(error instanceof Error ? error : new Error('Upload failed'));
    }
};