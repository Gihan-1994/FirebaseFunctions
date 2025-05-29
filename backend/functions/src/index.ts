import {https as httpsV2} from 'firebase-functions/v2';
import {initializeApp} from 'firebase-admin/app';
initializeApp();

export const helloFireWorld = httpsV2.onRequest((req, res) => {
  res.json({
   data: 'Hello Fire World!',
  });
});

