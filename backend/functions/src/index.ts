import * as functions from 'firebase-functions';
import {https as httpsV2} from 'firebase-functions/v2';

import cors from 'cors';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import multer from 'multer';
import { getStorage } from "firebase-admin/storage";
import { initializeApp, getApps } from "firebase-admin/app";

 const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
    initializeApp();
}


export const helloFireWorld = httpsV2.onRequest((req, res) => {
    res.json({
     data: 'Hello Fire World!',
    });
});
const corsHandler = cors({ origin: true });


export const uploadImageMulter = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        // Use multer middleware
        upload.single('image')(req as any, res as any, async (err: any) => {
            if (err) {
                res.status(400).json({message: err.message});
                return;
            }

            if (!req.file) {
                res.status(400).json({message: 'No file uploaded'});
                return;
            }

            try {
                const fileName = `images/${Date.now()}_${req.file.originalname}`;
                const bucket = getStorage().bucket();
                const file = bucket.file(fileName);

                await file.save(req.file.buffer, {
                    metadata: {
                        contentType: req.file.mimetype,
                    },
                });

                // Make file publicly accessible
                await file.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

                res.status(200).json({data: publicUrl});
            } catch (error) {
                console.error('Upload error:', error);
                res.status(500).json({
                    message: 'Upload failed',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        });
    });
});
