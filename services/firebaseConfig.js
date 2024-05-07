// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { isSupported } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0NcTxBZauKFfRoWPfhA7-rdrdEG6FYtA",
  authDomain: "emotional-journal-12cb4.firebaseapp.com",
  projectId: "emotional-journal-12cb4",
  storageBucket: "emotional-journal-12cb4.appspot.com",
  messagingSenderId: "400673749484",
  appId: "1:400673749484:web:c412cb33111f2d72ae68c9",
  measurementId: "G-E5TPBL8KN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Analytics (Optional) - Check if supported before initializing
(async () => {
  if (await isSupported()) {
    // Import and initialize Analytics if supported
    const { getAnalytics } = await import("firebase/analytics");
    const analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics er ikke understøttet i dette miljø.");
  }
})();
