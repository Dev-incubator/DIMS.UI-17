import { ButtonsAdmin } from '../components/Buttons/ButtonsAdmin/ButtonsAdmin';
import { ButtonsStatusUpdate } from '../components/Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';

export async function filterMembers(items) {
  const users = await items;

  return users.map((item) => ({
    ...item,
    name: `${item.name} ${item.lastName}`,
    actions: <ButtonsAdmin id={item.id} />,
  }));
}

export async function filterProgress(items) {
  const traks = await items;
  const allTraks = traks.map((item) => {
    const row = item.track.map((track) => {
      return { id: item.id, name: item.name, node: track.node, date: track.date };
    });

    return row;
  });
  const rows = allTraks.flat();

  return rows;
}

export async function filterCurrentTasks(items) {
  const tasks = await items;

  return tasks.map((item) => ({
    ...item,
    actions: <ButtonsStatusUpdate />,
  }));
}

export async function getFakeTasksItems(tasks) {
  const items = await tasks;

  return items.map((item) => [item.id, item.name, item.startDate, item.deadlineDate, item.status]);
}

export function goBack(history) {
  const stepBack = () => history.goBack();

  return stepBack;
}
