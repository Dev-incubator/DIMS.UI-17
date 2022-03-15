import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { filterMembers } from '../shared/helpers';

export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

  return filterMembers(users);
}

export async function findUser(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { role, name } = docSnap.data();

    return { role, name };
  }

  return false;
}

export async function getUserData(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
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

export async function editUser(id, data) {
  const washingtonRef = doc(db, 'users', id);
  await updateDoc(washingtonRef, data);

  return true;
}

export async function removeUserData(uid) {
  await deleteDoc(doc(db, 'users', uid));
}
