import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const requestPermissionForNotification = async (): Promise<
  string | null
> => {
  try {
    const registeration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    const token = await getToken(messaging, {
      vapidKey:
        "BFVlV87JAgfiWu8kCVBd5z6NB4ke3OHgSWnNsTMAe3ScZDYuu_anbJvN3il5xp4fnRXEURE4di5WIPnmKAoulMA",
      serviceWorkerRegistration: registeration,
    });
    return token;
  } catch {
    return null;
  }
};

onMessage(messaging, (payload) => {
  const title = payload.notification?.title || "Habit-Tracker";
  const body = payload.notification?.body;
  const icon = payload.notification?.icon;
  new Notification(title, { body, icon });
});
