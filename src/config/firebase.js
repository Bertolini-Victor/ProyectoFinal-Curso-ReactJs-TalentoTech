import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCQvX5oz0f9iyDw_HG9w1aVeFXlAzsW3do",
	authDomain: "techstore-reac.firebaseapp.com",
	projectId: "techstore-reac",
	storageBucket: "techstore-reac.firebasestorage.app",
	messagingSenderId: "451501655938",
	appId: "1:451501655938:web:d1d9386f51d2392357719b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
