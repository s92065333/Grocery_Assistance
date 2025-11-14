import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    return null;
  }
  
  if (!app) {
    try {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
    } catch (error) {
      console.warn('Failed to initialize Firebase:', error);
      return null;
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured()) {
    return null;
  }
  
  if (!auth) {
    const app = getFirebaseApp();
    if (!app) {
      return null;
    }
    auth = getAuth(app);
  }
  return auth;
}

export function getFirestoreDb(): Firestore | null {
  if (!isFirebaseConfigured()) {
    return null;
  }
  
  if (!db) {
    const app = getFirebaseApp();
    if (!app) {
      return null;
    }
    db = getFirestore(app);
  }
  return db;
}

export { app, auth, db };

