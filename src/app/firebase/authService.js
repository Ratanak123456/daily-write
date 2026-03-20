import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const mapFirebaseAuthError = (error) => {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found for this email.";
    case "auth/wrong-password":
      return "Invalid email or password.";
    default:
      return "Authentication failed. Please try again.";
  }
};

const getAuthTokens = async (user) => {
  const accessToken = await user.getIdToken();
  const refreshToken = user?.stsTokenManager?.refreshToken || null;

  return { accessToken, refreshToken };
};

export const registerWithEmailPassword = async (email, password, fullName) => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName) {
      await updateProfile(credential.user, { displayName: fullName });
    }

    return {
      user: credential.user,
      ...(await getAuthTokens(credential.user)),
    };
  } catch (error) {
    throw new Error(mapFirebaseAuthError(error));
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: credential.user,
      ...(await getAuthTokens(credential.user)),
    };
  } catch (error) {
    throw new Error(mapFirebaseAuthError(error));
  }
};

export const signOutFirebaseUser = async () => {
  await signOut(auth);
};

export const updateFirebaseUserProfile = async ({
  fullName,
  profileUrl,
  email,
}) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated Firebase user.");
  }

  try {
    await updateProfile(user, {
      displayName: fullName || user.displayName || null,
      photoURL: profileUrl || user.photoURL || null,
    });

    if (email && email !== user.email) {
      await updateEmail(user, email);
    }

    await user.reload();
    return user;
  } catch (error) {
    if (error?.code === "auth/requires-recent-login") {
      throw new Error("Please sign in again before changing your email.");
    }
    if (error?.code === "auth/invalid-email") {
      throw new Error("Please enter a valid email address.");
    }
    throw new Error(mapFirebaseAuthError(error));
  }
};
