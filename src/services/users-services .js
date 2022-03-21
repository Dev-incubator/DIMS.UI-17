import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { filterMembers } from '../shared/helpers';
import { registerUser } from './auth-services';

export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

  return filterMembers(users);
}

export async function getUserData(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export async function createUser(userData) {
  const { email, password } = userData;
  const uid = await registerUser(email, password);
  if (uid) {
    await setDoc(doc(db, 'users', uid), userData);

    return true;
  }

  return false;
}

export async function editUser(id, data) {
  const washingtonRef = doc(db, 'users', id);
  await updateDoc(washingtonRef, data);

  return true;
}

export async function removeUserData(uid) {
  await deleteDoc(doc(db, 'users', uid));
}
