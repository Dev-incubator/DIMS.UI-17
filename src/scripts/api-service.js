import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { db } from './firebase-config';

const tasksCollectionRef = collection(db, 'tasks');
const progressCollectionRef = collection(db, 'progress');

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

export async function getTaskById(taskId) {
  const snapshot = await getDoc(doc(db, 'tasks', taskId));

  return { ...snapshot.data(), taskId: snapshot.id };
}

export async function getUserProgress(userId) {
  const data = await getDocs(progressCollectionRef);
  const allProgress = data.docs.map((document) => ({ ...document.data(), id: document.id }));

  return Promise.all(
    allProgress
      .filter((el) => el.userId === userId)
      .map(async (taskProgress) => {
        const task = await getTaskById(taskProgress.taskId);

        return { ...taskProgress, taskTitle: task.title };
      }),
  );
}
