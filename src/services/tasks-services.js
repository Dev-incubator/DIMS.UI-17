import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function getAllTasks() {
  const querySnapshot = await getDocs(collection(db, 'tasks'));

  return querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
}

export async function createTask(taskData) {
  const response = await addDoc(collection(db, 'tasks'), taskData);

  return response;
}

export async function updateTask(id, taskData) {
  const washingtonRef = doc(db, 'tasks', id);
  await updateDoc(washingtonRef, taskData);

  return true;
}
