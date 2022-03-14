import { collection, getDocs, addDoc, doc, updateDoc, query, where, getDoc } from 'firebase/firestore';
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
  const taskRef = doc(db, 'tasks', id);
  await updateDoc(taskRef, taskData);

  return true;
}

export async function getMemberTasks(id) {
  const tasksRef = collection(db, 'tasks');
  const memberTasks = query(tasksRef, where('subscribers', 'array-contains', id));
  const querySnapshot = await getDocs(memberTasks);

  return querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getTaskData(uid) {
  const docRef = doc(db, 'tasks', uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export async function changeTaskStatus(taskId, userId, newStatus) {
  const data = await getTaskData(taskId);
  const { statuses } = data;
  const updateStatus = statuses.map((item) => (item.id === userId ? { ...item, status: newStatus } : item));
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, { ...data, statuses: updateStatus });

  return updateStatus;
}
