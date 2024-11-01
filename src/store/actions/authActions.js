import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, storage, db } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const checkEmailExists = ({
  email,
  onSuccess = () => {},
  onError = () => {},
}) => {
  return async (dispatch) => {
    dispatch({ type: "CHECK_EMAIL_PENDING" });
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        dispatch({
          type: "CHECK_EMAIL_SUCCESS",
          payload: true,
        });
        toast.error("Email is already in use");
        onError();
      } else {
        dispatch({
          type: "CHECK_EMAIL_SUCCESS",
          payload: false,
        });
        onSuccess();
      }
    } catch (error) {
      toast.error(error.message || "An unknown error occurred.");
      dispatch({
        type: "CHECK_EMAIL_REJECTED",
      });
    }
  };
};

export const signUp = (userData, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: "SIGN_UP_PENDING" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData?.email,
        userData?.password
      );
      const user = userCredential.user;

      const payload = {
        role: "admin",
        name: userData?.name,
        email: userData?.email,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user?.uid), payload);
      toast.success("User Signed Up Successfully!");
      dispatch({
        type: "SIGN_UP_SUCCESS",
      });
      onSuccess();
    } catch (error) {
      toast.error(error.message || "An unknown error occured");
      dispatch({
        type: "SIGN_UP_REJECTED",
      });
    }
  };
};

export const signIn = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({ type: "SIGN_IN_PENDING" });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User not found");
      }
      const userData = { ...userDoc.data(), uid: user.uid };

      if (userData?.status === "pending") {
        throw new Error("User not verified");
      }

      toast.success("User Signed In Successfully!");
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: userData,
      });
      onSuccess();
    } catch (error) {
      toast.error(error.message || "An unknown error occured");
      dispatch({
        type: "SIGN_IN_REJECTED",
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      toast.success("User Logged Out Successfully!");
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchStates = () => {
  return async (dispatch) => {
    try {
      const statesCollectionRef = collection(db, "states");
      const statesSnapshot = await getDocs(statesCollectionRef);

      const statesList = statesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({
        type: "FETCH_STATES_SUCCESS",
        payload: statesList,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
