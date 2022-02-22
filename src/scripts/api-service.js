import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { db } from './firebase-config';

const tasksCollectionRef = collection(db, 'tasks');

export async function getUserById(userId) {
  const snapshot = await getDoc(doc(db, 'users', userId));

  return { ...snapshot.data(), userId: snapshot.id };
}

export async function getTasksData(userId) {
  const data = await getDocs(tasksCollectionRef);
  const allTasks = data.docs.map((document) => ({ ...document.data(), id: document.id }));

  return allTasks
    .map((task) => {
      const taskInfo = task.users.find((user) => user.userId === userId);

      return taskInfo ? { title: task.title, id: task.id, ...taskInfo } : null;
    })
    .filter((el) => el);
}
