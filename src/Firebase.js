// import { initializeApp } from 'firebase/app';
// import { getToken, getMessaging, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: "AIzaSyCWlxOQ8nJyzwxon86BnSlV7wpcXBIERMM",
//   authDomain: "edlore-5312c.firebaseapp.com",
//   projectId: "edlore-5312c",
//   storageBucket: "edlore-5312c.appspot.com",
//   messagingSenderId: "257473107250",
//   appId: "1:257473107250:web:421aeebc8a33249632732b",
//   measurementId: "G-BLCZWYF7FZ"
// };

// console.log('*** Environment ***', process.env.REACT_APP_VAPID_KEY)
// console.log('*** Firebase Config ***', firebaseConfig)

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// export const getOrRegisterServiceWorker = () => {
//   console.log("coming inside the registration");
//   if ('serviceWorker' in navigator) {
//     return window.navigator.serviceWorker
//       .getRegistration('/firebase-push-notification-scope')
//       .then((serviceWorker) => {
//         if (serviceWorker) return serviceWorker;
//         return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//           scope: '/firebase-push-notification-scope',
//         });
//       });
//   }
//   throw new Error('The browser doesn`t support service worker.');
// };

// export const getFirebaseToken = () =>
//   console.log("coming inside the function");
// getOrRegisterServiceWorker()
//   .then((serviceWorkerRegistration) =>
//     getToken(messaging, { vapidKey: 'BOjNu7uPDYX-ElSWoQR-yIpgHlegksGbklatZQTQfSdTLWDLCm_eHDbxhxcFCUGaj_ocef_qGTiEgiyQUDoHhhs', serviceWorkerRegistration }))
//   .then(res => {
//     console.log(res, "the response in the get token")
//   })

// export const onForegroundMessage = () =>
//   new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));