import {https as httpsV2} from 'firebase-functions/v2';
//import * as functions from "firebase-functions/v2";
import express from "express";
import cors from "cors";
import multer from "multer";
import { getDownloadURL } from "firebase-admin/storage";
//import {storage} from "./config/firebase-config";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";

initializeApp();
const storage = getStorage();

export const helloFireWorld = httpsV2.onRequest((req, res) => {
  res.json({
   data: 'Hello Fire World!',
  });
});

const app = express();
app.use(cors({origin: true}));
const upload = multer({storage: multer.memoryStorage()});

app.post('/upload', upload.single('image'), async (req, res) => {
try {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const file = req.file;
    console.log("Received file:", file);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
        res.status(400).send("Invalid file type");
        return;
    }

    const storageRef = storage.bucket().file(`images/${file.originalname}`);
    await storageRef.save(file.buffer);
    const downloadURL = await getDownloadURL(storageRef);
    res.status(200).send({data: downloadURL});
} catch (error :Error | any) {
    console.error("Upload error details:", error);
    console.error("Error stack:", error.stack);
    res.status(500).send({error: "Upload failed", details: error.message});
    console.error("Upload error:", error);
    res.status(500).send("Upload failed");
}
});
export const api = httpsV2.onRequest(app);