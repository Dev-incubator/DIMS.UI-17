import { ButtonsAdmin } from '../components/Buttons/ButtonsAdmin/ButtonsAdmin';
import { ButtonsStatusUpdate } from '../components/Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';

export async function getMemberItems(items) {
  const users = await items;

  return users.map((item) => [
    item.id,
    `${item.name} ${item.lastName}`,
    item.directon,
    item.education,
    item.startDate,
    item.birthDate,
    <ButtonsAdmin id={item.id} />,
  ]);
}

export async function filterProgress(items) {
  const traks = await items;
  const allTraks = traks.map((item) => {
    const row = item.track.map((track) => {
      return { id: item.id, name: item.name, node: track.node, data: track.data };
    });

    return row;
  });
  const rows = allTraks.flat();

  return rows.map((item) => [item.id, item.name, item.node, item.data]);
}

export async function filterCurrentTasks(items) {
  const tasks = await items;

  return tasks.map((item) => [
    item.id,
    item.name,
    item.startDate,
    item.deadlineDate,
    item.status,
    <ButtonsStatusUpdate />,
  ]);
}

export async function getFakeTasksItems(tasks) {
  const items = await tasks;

  return items.map((item) => [item.id, item.name, item.startDate, item.deadlineDate, item.status]);
}

export function stepBack() {
  window.history.back();
}
export function createTask() {
  console.log('show modal');
}
