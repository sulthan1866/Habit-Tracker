// Import Firebase libraries required for messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// Your Firebase configuration

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAgvrcrYzDPEoTBxk1U4fjStGL9rAn_WBU",
  authDomain: "habit-tracker-1866.firebaseapp.com",
  projectId: "habit-tracker-1866",
  storageBucket: "habit-tracker-1866.firebasestorage.app",
  messagingSenderId: "39936856634",
  appId: "1:39936856634:web:a243c8e95c2a5badc51b03",
  measurementId: "G-EZKC27NLZQ",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/1866Logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://habitater.netlify.app"));
});
