import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBbhxBwoZtcodF6rY_RmUzwdm2I4t2cLxg",
  authDomain: "webdev-ce607.firebaseapp.com",
  projectId: "webdev-ce607",
  storageBucket: "webdev-ce607.appspot.com",
  messagingSenderId: "499413936747",
  appId: "1:499413936747:web:a762398fb02cbfda8cdf2e",
  measurementId: "G-H7LDFD2VSN"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)