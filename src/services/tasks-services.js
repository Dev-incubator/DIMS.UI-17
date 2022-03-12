import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function getAllTasks() {
  const querySnapshot = await getDocs(collection(db, 'tasks'));

  return querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
}

export async function createTask(taskData) {
  console.log('res---', taskData);
  const response = await addDoc(collection(db, 'tasks'), taskData);

  return response;
  // return res;
}
