import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from '$lib/firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { db } from '$lib/firebase';
import { collection, addDoc, getDocs, query, where, type CollectionReference } from 'firebase/firestore';

export const user = writable<User | null>(null);
export const isAuthenticated = writable<boolean>(false);

// Sign in
export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user.set(userCredential.user);
        isAuthenticated.set(true);
        return { success: true };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, error };
    }
};

// Sign out
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        user.set(null);
        isAuthenticated.set(false);
        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error };
    }
};

// Add data
export const addData = async (collection_name: string, data: any) => {
    try {
        const docRef = await addDoc(collection(db, collection_name), {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding document:', error);
        return { success: false, error };
    }
};

// Read data
export const getData = async (collection_name: string, whereClause?: { field: string; operator: any; value: any }) => {
    try {
        const collectionRef = collection(db, collection_name);
        const q = whereClause 
            ? query(collectionRef, where(whereClause.field, whereClause.operator, whereClause.value))
            : collectionRef;
        
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { success: true, data };
    } catch (error) {
        console.error('Error getting documents:', error);
        return { success: false, error };
    }
}; 