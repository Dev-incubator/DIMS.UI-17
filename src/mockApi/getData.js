import { PAGES_KEYS, baseURL } from '../shared/constants';
import { filterProgress, filterCurrentTasks } from '../shared/helpers';

// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// async function getData(db) {
//   const querySnapshot = await getDocs(collection(db, 'users'));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.data());
//   });
// }

// getData(db);

// export async function getUsers(app) {
//   const db = getFirestore(app);
//   const usersCol = collection(db, 'users');
//   const usersSnapshot = await getDocs(usersCol);
//   const usersList = usersSnapshot.docs.map((doc) => doc.data());
//   console.log(usersList);
// }

export async function getFakeUsers() {
  const response = await fetch(`${baseURL}/users`);
  const users = await response.json();

  return users;
}

export async function getFakeTasks() {
  const response = await fetch(`${baseURL}/tasks`);
  const tasks = await response.json();

  return tasks;
}

export async function getFakeCurrentTasks(id, page) {
  const allTasks = await getFakeTasks();
  const mainTasks = allTasks.tasks.filter((item) => item.subscribers.includes(id));

  return page === PAGES_KEYS.progress ? filterProgress(mainTasks) : filterCurrentTasks(mainTasks);
}
