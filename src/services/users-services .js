import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { filterMembers } from '../shared/helpers';
import { registerUser } from './auth-services';

export async function getAllUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

    return filterMembers(users);
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function getUserData(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function createUser(userData) {
  const { email, password } = userData;
  try {
    const uid = await registerUser(email, password);
    if (uid) {
      await setDoc(doc(db, 'users', uid), userData);

      return true;
    }

    return false;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function editUser(id, data) {
  try {
    const usersRef = doc(db, 'users', id);
    await updateDoc(usersRef, data);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function removeUserData(uid) {
  try {
    await deleteDoc(doc(db, 'users', uid));
    const userData = await getUserData(uid);
    if (userData) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
