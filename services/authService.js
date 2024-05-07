// src/services/authService.js
import { auth } from './firebaseConfig'; // Make sure this points to your initialized Firebase config
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Function for signing in with email and password
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function for signing up a new user
export async function signup(email, password) {
    // Create the user using the Firebase `createUserWithEmailAndPassword` method
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Immediately sign out the user to return to the login page
    await auth.signOut();
  
    // Return the created user object for optional future use
    return userCredential.user;
  }

// Function for logging out the current user
export const logout = async () => {
  return signOut(auth);
};