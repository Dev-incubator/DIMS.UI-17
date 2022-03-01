import { baseURL } from '../shared/constants';
import { filterCurrentTasks, filterProgress } from '../shared/helpers';

export async function getFakeUsers() {
  const response = await fetch(`${baseURL}/users`);
  const users = await response.json();

  return users;
}

export async function getAllFakeTasks() {
  const response = await fetch(`${baseURL}/tasks`);
  const tasks = await response.json();

  return filterCurrentTasks(tasks);
}

export async function getMemberTasks(id) {
  const response = await fetch(`${baseURL}/users/?id=${id}`);
  const user = await response.json();
  const { tasksId } = user[0];
  const tasks = await Promise.all(
    tasksId.map(async (taskId) => {
      const currentTask = await fetch(`${baseURL}/tasks/${taskId}`);
      const task = await currentTask.json();

      return task;
    }),
  );

  return filterCurrentTasks(tasks);
}

export async function getTraks(userId) {
  const memberId = await userId;
  const response = await fetch(`${baseURL}/users/?id=${memberId}`);
  const user = await response.json();
  const [{ tasksId }] = user;

  const traks = await Promise.all(
    tasksId.map(async (taskId) => {
      const responseTrack = await fetch(`${baseURL}/tracks/?taskId=${taskId}`);
      const responseTask = await fetch(`${baseURL}/tasks/?id=${taskId}`);
      const track = await responseTrack.json();
      const task = await responseTask.json();
      const [{ id, name }] = task;

      return { id, name, track };
    }),
  );

  return filterProgress(traks);
}
