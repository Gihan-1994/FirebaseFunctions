import {https as httpsV2} from "firebase-functions";

export const helloFireWorld = httpsV2.onRequest((req, res) => {
    res.json({
        data: 'Hello Fire World!',
    });
});