import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_GCP_API_KEY,
  authDomain: process.env.VUE_APP_GCP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_GCP_DATABASE_URL,
  projectId: process.env.VUE_APP_GCP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_GCP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_GCP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_GCP_APP_ID,
  measurementId: process.env.VUE_APP_GCP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;