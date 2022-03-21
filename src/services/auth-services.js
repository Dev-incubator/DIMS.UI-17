import { getDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';

export async function findUser(email, password) {
  const auth = getAuth();
  try {
    const {
      user: { uid },
    } = await signInWithEmailAndPassword(auth, email, password);

    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { role, name } = docSnap.data();

      return { role, name, uid };
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function registerUser(email, password) {
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const {
    user: { uid },
  } = user;

  return uid;
}
