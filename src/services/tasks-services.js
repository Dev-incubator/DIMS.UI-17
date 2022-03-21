import { collection, getDocs, addDoc, doc, updateDoc, query, where, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function getAllTasks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));

    return querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function createTask(taskData) {
  try {
    const response = await addDoc(collection(db, 'tasks'), taskData);

    return response;
  } catch (error) {
    return false;
  }
}

export async function removeTask(uid) {
  try {
    await deleteDoc(doc(db, 'tasks', uid));

    return true;
  } catch (error) {
    return false;
  }
}

export async function updateTask(id, taskData) {
  try {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, taskData);

    return true;
  } catch (error) {
    return false;
  }
}

export async function getMemberTasks(id) {
  try {
    const tasksRef = collection(db, 'tasks');
    const memberTasks = query(tasksRef, where('subscribers', 'array-contains', id));
    const querySnapshot = await getDocs(memberTasks);

    return querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  } catch (error) {
    return false;
  }
}

export async function getTaskData(uid) {
  try {
    const docRef = doc(db, 'tasks', uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    return false;
  }
}

export async function changeTaskStatus(taskId, userId, newStatus) {
  try {
    const data = await getTaskData(taskId);
    const { statuses } = data;
    const updateStatus = statuses.map((item) => (item.id === userId ? { ...item, status: newStatus } : item));
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { ...data, statuses: updateStatus });

    return updateStatus;
  } catch (error) {
    return false;
  }
}
