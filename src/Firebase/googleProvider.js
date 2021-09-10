import { GoogleAuthProvider } from "@firebase/auth";
import { signInWithPopup } from "firebase/auth";

import { loginHandler } from "../Redux/Slices/authSlice";

import { auth } from "./Firebase";
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (dispatch) => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const token = await response.user.getIdToken();
    dispatch(loginHandler(token));
  } catch (err) {
    err.message;
  }
};
