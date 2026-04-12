// plugins/firebase.client.ts
import { defineNuxtPlugin } from '#app';
// import { initializeApp, getApps } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// import { getMessaging } from 'firebase/messaging';

export default defineNuxtPlugin((nuxtApp) => {
  // const firebaseConfig = {};

  // let app;
  // if (!getApps().length) {
  //   app = initializeApp(firebaseConfig);
  // } else {
  //   app = getApps()[0];
  // }

  // const auth = getAuth(app);
  // const db = getFirestore(app);
  // const storage = getStorage(app);
  // const analytics = getAnalytics(app);

  // let messaging;
  // try {
  //   messaging = getMessaging(app);
  // } catch (err) {
  //   console.warn('Firebase Messaging not supported:', err.message);
  // }

  // return {
  //   provide: {
  //     firebaseApp: app,
  //     auth,
  //     db,
  //     storage,
  //     analytics,
  //     messaging,
  //   },
  // };
  return {};
});
