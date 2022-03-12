import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
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
    console.log('Document data:', docSnap.data());
    const { role, name } = docSnap.data();

    return { role, name };
  }

  return false;
}

async function registerUser({ email, password }) {
  console.log(email, password);
  const auth = getAuth();
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const {
    user: { uid },
  } = user;

  return uid;
}

export async function createUser(userData) {
  console.log(userData);
  const uid = await registerUser(userData);
  if (uid) {
    console.log('Получили Uid', uid);
    await setDoc(doc(db, 'users', uid), userData);

    return true;
  }
  console.log('Не получили Uid', uid);

  return false;
}
