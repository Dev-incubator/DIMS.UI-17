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
  const tasks = await items;

  return tasks.map((item) => [item.id, item.name, item.track.node, item.startDate]);
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
