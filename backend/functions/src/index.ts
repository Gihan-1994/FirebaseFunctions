import {https as httpsV2} from 'firebase-functions/v2';


export const helloFireWorld = httpsV2.onRequest((req, res) => {
  res.json({
   data: 'Hello Fire World!',
  });
});

