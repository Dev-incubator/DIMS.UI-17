import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';

export async function getAllUsers() {
  //   const docRef = doc(db, 'users', 'SosgXD0H05f72k94B6x4RmpOK6F2');
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log('No such document!');
  //   }

  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((document) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(document.id, ' => ', document.data());
  });
}

export async function findUser(uid) {
  console.log('find user', uid);
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    //    doc.data() will be undefined in this case
    console.log('No such document!');
  }

  const { role, name } = docSnap.data();

  return { role, name };
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
  } else {
    console.log('Не получили Uid', uid);
  }
}
