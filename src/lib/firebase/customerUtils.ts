import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, customerCollectionName } from '../firebase';

export async function getCustomerDocById(docId: string) {
    console.log("firebase.ts: getDocById: id: ", docId);
    const docRef = doc(db, customerCollectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
}

export function getCustomerVehicle(uid: string, vehicleId: string) {
    console.log("firebase.ts: getCustomerVehicle: uid: ", uid, " vehicleId: ", vehicleId);
    try {
        if (!uid || !vehicleId) {
            console.error('Missing userId or vehicleId');
            throw new Error('Missing userId or vehicleId');
        }
        const docRef = doc(db, customerCollectionName, uid, "vehicles", vehicleId);
        const docSnap = getDoc(docRef);
        return docSnap;
    } catch (error) {
        console.log("firebase.ts: getCustomerVehicle: error: ", error);
        return false;
    }
}

export const customerUtils = {
    createCustomerAccount: async (email: string, password: string) => {
        console.log('firebase.ts: customerUtils: createCustomerAccountWithDetails: email: ', email);

        let userCredential;
        try {
            try {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            } catch (error: unknown) {
                if (error instanceof Error && 'code' in error && error.code === "auth/email-already-in-use") {
                    console.log("firebase.ts: createCustomerAccountWithDetails: user already exists", email);
                    throw error;
                }
                throw error;
            }

            if (!userCredential) {
                throw new Error("Failed to create user account");
            }

            console.log("firebase.ts: createCustomerAccountWithDetails: user created successfully", userCredential.user.uid);
            return userCredential.user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("firebase.ts: createCustomerAccountWithDetails: error creating user or adding details", error.message);
            } else {
                console.error("firebase.ts: createCustomerAccountWithDetails: unknown error occurred");
            }
            throw error;
        }
    },

    setupAccountDetails: async (uid: string, accountData: {
        c_email: string;
        c_phone: string;
        c_fname: string;
        c_lname: string;
    }) => {
        const userDocRef = doc(db, customerCollectionName, uid);
        await setDoc(userDocRef, {
            c_email: accountData.c_email,
            c_phone: accountData.c_phone,
            c_fname: accountData.c_fname,
            c_lname: accountData.c_lname,
            permissions: {
                admin: false,
                customer: true,
            },
            createdAt: Timestamp.now().toDate()
        });
    },

    getUserAccount: async (uid: string) => {
        const userDocRef = doc(db, customerCollectionName, uid);
        const docSnap = await getDoc(userDocRef);
        return docSnap.data();
    },
}; 