import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function getTaskData(uid) {
  const docRef = doc(db, 'tasks', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export async function removeTask(uid) {
  await deleteDoc(doc(db, 'tasks', uid));
}
