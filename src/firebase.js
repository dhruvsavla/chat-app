import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3Z29xppQa8goEa-zbnq5yb8zBofiWofE",
    authDomain: "chat-app-c90ee.firebaseapp.com",
    projectId: "chat-app-c90ee",
    storageBucket: "chat-app-c90ee.appspot.com",
    messagingSenderId: "904220128569",
    appId: "1:904220128569:web:087ffed854c8c04ac524e8",
    measurementId: "G-5CN6FTYBK4"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;