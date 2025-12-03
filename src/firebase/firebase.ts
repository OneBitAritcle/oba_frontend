import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHmeRU8lc_DCCxLTq-CN-Zi7crfF9BwE0",
  authDomain: "onebite-56759.firebaseapp.com",
  projectId: "onebite-56759",
  storageBucket: "onebite-56759.firebasestorage.app",
  messagingSenderId: "774547640000",
  appId: "1:774547640000:ios:4100e08b507fda3ef52725"
};

// 🔹 앱 중복 생성 방지
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// 🔹 Auth 중복 초기화 방지 (Expo에서 필수)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = require("firebase/auth").getAuth(app);
}

export { app, auth };
