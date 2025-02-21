import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import { 
    getFirestore, 
    type Firestore,
    type DocumentData, 
    type DocumentReference, 
    type CollectionReference 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment, isLive } from '$lib';

const firebaseConfig = {
    apiKey: 'AIzaSyBmL7w_25S5CzBZYbNcOcH9CNx4vRbNwno',
    authDomain: 'macroexotics.firebaseapp.com',
    databaseURL: 'https://macroexotics-default-rtdb.firebaseio.com',
    projectId: 'macroexotics',
    storageBucket: 'macroexotics.firebasestorage.app',
    messagingSenderId: '982619582330',
    appId: '1:982619582330:web:3940ae8555ad3507dd30c3',
    measurementId: 'G-C7B0CXY4PF'
};

console.log("firebase.ts: environment: ", environment);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Collection Names
export const customerCollectionName = isLive ? "macroexotic-customers" : "macroexotic-customers-dev";

// Export initialized services
export { app as firebase, auth, db, storage };

// Export types
export type { User, DocumentData, DocumentReference, CollectionReference }; 