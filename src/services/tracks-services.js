import { collection, getDocs, doc, updateDoc, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { getTaskData } from './tasks-services';

export async function getTracks(taskId, userId) {
  try {
    const data = await getTaskData(taskId);
    const { tracks } = data;
    const userTracks = tracks ? tracks.filter((item) => item.userId === userId) : [];

    return userTracks;
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function createTrack(taskId, data) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      tracks: arrayUnion(data),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function removeTrack(taskId, trackId) {
  try {
    const data = await getTaskData(taskId);
    const { tracks } = data;
    const updatedTracks = tracks.filter((track) => track.id !== trackId);
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { ...data, tracks: updatedTracks });
  } catch (error) {
    console.error();
  }
}

export async function getUserTracks(userId) {
  try {
    const tasksRef = collection(db, 'tasks');
    const tasksQuery = query(tasksRef, where('assignedUsers', 'array-contains', userId));
    const querySnapshot = await getDocs(tasksQuery);
    const tracks = querySnapshot.docs
      .map((item) => item.data())
      .filter((task) => task.tracks)
      .map((task) => task.tracks)
      .flat()
      .filter((track) => track.userId === userId);

    return tracks;
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

export async function updateTracks(data, taskId, userId) {
  try {
    const tracks = await getTracks(taskId, userId);
    const updatedTracks = tracks.map((item) => (item.id === data.id ? data : item));
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      tracks: updatedTracks,
    });
  } catch (error) {
    console.error(error);
  }
}
