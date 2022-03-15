// import { ButtonsTask } from '../components/Buttons/ButtonsTask/ButtonsTask';
import { ButtonsStatusUpdate } from '../components/Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';

export function filterMembers(items) {
  return items.map((item) => ({
    ...item,
    name: `${item.name} ${item.lastName}`,
  }));
}

export async function filterProgress(items, isTrackPage) {
  const allTraks = items.map((item) => {
    const row = item.track.map((track) => {
      return {
        id: item.id,
        name: item.name,
        node: track.node,
        date: track.date,
      };
    });

    return row;
  });
  const rows = allTraks.flat();

  return isTrackPage ? rows.map((item) => ({ ...item, actions: <ButtonsStatusUpdate id={item.id} /> })) : rows;
}

export function filterAllTasks(items) {
  return items.map((item) => ({
    ...item,
  }));
}

export async function filterCurrentTasks(items) {
  return items.map((item) => ({
    ...item,
    actions: <ButtonsStatusUpdate />,
  }));
}

export function getFakeTasksItems(tasks) {
  const items = tasks;

  return items.map((item) => [item.id, item.name, item.startDate, item.deadlineDate, item.status]);
}

export function createTask() {
  console.log('show modal');
}

export function generateId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ID = '';
  for (let i = 0; i < 12; i += 1) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }

  return ID;
}
