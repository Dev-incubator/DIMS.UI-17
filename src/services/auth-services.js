import { getDoc, doc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { db } from '../firebase';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function singInEmailAndPassword(email, password) {
  try {
    const {
      user: { uid },
    } = await signInWithEmailAndPassword(auth, email, password);

    return findUser(uid);
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function singInGoogle() {
  try {
    const {
      user: { uid },
    } = await signInWithPopup(auth, provider);

    return findUser(uid);
  } catch (error) {
    console.error(error);

    return false;
  }
}

async function findUser(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { role, name } = docSnap.data();

      return { role, name, uid };
    }

    return false;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const {
      user: { uid },
    } = user;

    return uid;
  } catch (error) {
    console.error(error);

    return false;
  }
}
