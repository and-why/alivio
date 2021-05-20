import admin from 'firebase-admin';
import serviceAccount from '@/lib/alivio-5722c-firebase-adminsdk-8bpqi-eff8708589.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: 'alivio-5722c.firebaseapp.com',
  });
}

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'alivio-5722c.firebaseapp.com',
//   });
// }

export default admin.firestore();
