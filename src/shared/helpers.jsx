import { ButtonsAdmin } from '../components/Buttons/ButtonsAdmin/ButtonsAdmin';
import { ButtonsStatusUpdate } from '../components/Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';

export function filterMembers(items) {
  const users = items;

  return users.map((item) => ({
    ...item,
    name: `${item.name} ${item.lastName}`,
    actions: <ButtonsAdmin id={item.id} />,
  }));
}

export function filterProgress(items) {
  const traks = items;
  const allTraks = traks.map((item) => {
    const row = item.track.map((track) => {
      return { id: item.id, name: item.name, node: track.node, date: track.date };
    });

    return row;
  });
  const rows = allTraks.flat();

  return rows;
}

export function filterCurrentTasks(items) {
  const tasks = items;

  return tasks.map((item) => ({
    ...item,
    actions: <ButtonsStatusUpdate />,
  }));
}

export function getFakeTasksItems(tasks) {
  const items = tasks;

  return items.map((item) => [item.id, item.name, item.startDate, item.deadlineDate, item.status]);
}

export function goBack(history) {
  const stepBack = () => history.goBack();

  return stepBack;
}
