import { getDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';

export async function findUser(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { role, name } = docSnap.data();

    return { role, name };
  }

  return false;
}

async function registerUser({ email, password }) {
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const {
    user: { uid },
  } = user;

  return uid;
}

export async function createUser(userData) {
  const uid = await registerUser(userData);
  if (uid) {
    await setDoc(doc(db, 'users', uid), userData);

    return true;
  }

  return false;
}
