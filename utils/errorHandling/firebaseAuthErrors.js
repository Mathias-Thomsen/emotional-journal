// src/utils/errorHandling/firebaseAuthErrors.js
export function getAuthErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email address is badly formatted.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email address is already in use.';
      case 'auth/weak-password':
        return 'The password must be at least 6 characters long.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  