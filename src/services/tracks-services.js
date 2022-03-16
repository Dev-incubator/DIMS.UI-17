import { collection, getDocs, doc, updateDoc, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { getTaskData } from './tasks-services';

export async function getTracks(taskId, userId) {
  const data = await getTaskData(taskId);
  const { tracks } = data;
  const userTracks = tracks ? tracks.filter((item) => item.userId === userId) : [];

  return userTracks;
}

export async function createTrack(taskId, userId, data) {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    tracks: arrayUnion({ ...data, userId }),
  });
}

export async function removeTrack(taskId, trackId) {
  const data = await getTaskData(taskId);
  const { tracks } = data;
  const updatedTracks = tracks.filter((track) => track.id !== trackId);
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, { ...data, tracks: updatedTracks });
}

export async function getUserTracks(userId) {
  const tasksRef = collection(db, 'tasks');
  const tasksQuery = query(tasksRef, where('subscribers', 'array-contains', userId));
  const querySnapshot = await getDocs(tasksQuery);
  const tracks = querySnapshot.docs
    .map((item) => item.data())
    .filter((task) => task.tracks)
    .map((task) => task.tracks)
    .flat()
    .filter((track) => track.userId === userId);

  return tracks;
}
