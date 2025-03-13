// // Firebase Cloud Messaging Configuration File.
// // Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive
// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// import { saveClientToken } from "../redux/reduxes/notifications/notificationAction";
// import { store } from '../redux/store/index';
// const firebaseConfig = {
//   apiKey: "AIzaSyCWlxOQ8nJyzwxon86BnSlV7wpcXBIERMM",
//   authDomain: "edlore-5312c.firebaseapp.com",
//   projectId: "edlore-5312c",
//   storageBucket: "edlore-5312c.appspot.com",
//   messagingSenderId: "257473107250",
//   appId: "1:257473107250:web:421aeebc8a33249632732b",
//   measurementId: "G-BLCZWYF7FZ"
// };

// initializeApp(firebaseConfig);
// let messaging = null
// if (navigator && ('serviceWorker' in navigator)) {
//   messaging = getMessaging();
// }
// console.log(messaging, "messaging KO>KOKL");

// export const requestForToken = () => {
//   return getToken(messaging, { vapidKey: `BOjNu7uPDYX-ElSWoQR-yIpgHlegksGbklatZQTQfSdTLWDLCm_eHDbxhxcFCUGaj_ocef_qGTiEgiyQUDoHhhs` })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         // Perform any other neccessary action with the token
//       } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//       }
//     })
//     .catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//     });
// };


// // export const requestForToken = () => {

// //   return getToken(messaging, { vapidKey: `BOjNu7uPDYX-ElSWoQR-yIpgHlegksGbklatZQTQfSdTLWDLCm_eHDbxhxcFCUGaj_ocef_qGTiEgiyQUDoHhhs` })
// //     .then((currentToken) => {
// //       console.log(currentToken, "currentToken LLLLLLL");
// //       if (currentToken) {
// //         const data = {
// //           device_token: currentToken
// //         }
// //         store.dispatch(saveClientToken(data));
// //         // Perform any other neccessary action with the token      } else {
// //         // Show permission request UI        console.log('No registration token available. Request permission to generate one.');
// //       }
// //     })
// //     .catch((err) => {
// //       console.log('An error occurred while retrieving token. ', err);
// //     });
// // };

// // Handle incoming messages. Called when:
// // - a message is received while the app has focus
// // - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });


