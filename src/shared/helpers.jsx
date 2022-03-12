import { ButtonsTrack } from '../components/Buttons/ButtonsTrack/ButtonsTrack';
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

  return isTrackPage ? rows.map((item) => ({ ...item, actions: <ButtonsTrack id={item.id} /> })) : rows;
}

export async function filterAllTasks(items) {
  return items.map((item) => ({
    ...item,
    actions: <ButtonsTrack />,
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
