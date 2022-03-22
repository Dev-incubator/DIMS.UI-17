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

    return false;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function registerUser(email, password) {
  try {
    const auth = getAuth();
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
