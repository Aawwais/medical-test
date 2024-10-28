import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";

const PAGE_SIZE = 5;

export const fetchTests =
  (filter, isLoadMore, onComplete = () => {}) =>
  async (dispatch, getState) => {
    console.log(filter);
    try {
      const state = getState();
      const lastVisible = isLoadMore ? state.tests.lastVisible : null;

      let testsQuery = query(
        collection(db, "tests"),
        orderBy("created_at", "desc"),
        limit(PAGE_SIZE)
      );

      if (filter?.category) {
        testsQuery = query(
          testsQuery,
          where("testCategory", "==", filter.category)
        );
      }
      if (filter?.testId) {
        testsQuery = query(testsQuery, where("testId", "==", filter.testId));
      }

      if (lastVisible) {
        testsQuery = query(testsQuery, startAfter(lastVisible));
      }

      const snapshot = await getDocs(testsQuery);
      // const tests = snapshot.docs.map((doc) => ({
      //   uid: doc.id,
      //   ...doc.data(),
      // }));
      let tests = [];
      for await (let doc of snapshot.docs) {
        tests.push({ uid: doc.id, ...doc.data() });
      }
      console.log(snapshot);
      const newLastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
      const hasMore = snapshot.docs.length === PAGE_SIZE;

      if (lastVisible) {
        dispatch({
          type: "LOAD_MORE_TESTS",
          payload: { tests, lastVisible: newLastVisible, hasMore },
        });
      } else {
        dispatch({
          type: "FETCH_ALL_TESTS",
          payload: { tests, lastVisible: newLastVisible, hasMore },
        });
      }

      onComplete();
    } catch (error) {
      console.error("Error fetching tests:", error);
      onComplete(error);
    }
  };

export const addTest =
  (data, onComplete = () => {}) =>
  async (dispatch) => {
    try {
      const uniqueId = uuidv4().slice(0, 8);
      const test = {
        ...data,
        testId: uniqueId,
        created_at: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "tests"), test);
      dispatch({
        type: "CREATE_TEST",
        payload: { id: docRef.id, ...test, created_at: new Date() },
      });
      onComplete();
    } catch (error) {
      console.error("Error adding test:", error);
      onComplete(error);
    }
  };

export const editTest =
  (id, test, onComplete = () => {}) =>
  async (dispatch) => {
    try {
      await updateDoc(doc(db, "tests", id), test);
      dispatch({
        type: "UPDATE_TEST",
        payload: { id, ...test },
      });
      onComplete();
    } catch (error) {
      console.error("Error editing test:", error);
      onComplete(error);
    }
  };

export const deleteTest =
  (id, onComplete = () => {}) =>
  async (dispatch) => {
    try {
      await deleteDoc(doc(db, "tests", id));
      dispatch({ type: "DELETE_TEST", payload: id });
      onComplete();
    } catch (error) {
      console.error("Error deleting test:", error);
      onComplete(error);
    }
  };
