import { db } from './firebase-admin';
import { compareDesc, parse, compareAsc, parseISO, format } from 'date-fns';

export async function getAllProjects() {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = [];

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    projects.sort((a, b) => {
      compareDesc(parseISO(a.dateCreated), parseISO(b.dateCreated));
    });

    return { projects };
  } catch (error) {
    return { error };
  }
}

export async function getUserProjects(userId) {
  const snapshot = await db.collection('projects').where('uid', '==', userId).get();
  const projects = [];

  snapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });

  projects.sort((a, b) => {
    compareAsc(parseISO(a.dateCreated), parseISO(b.dateCreated));
  });

  return { projects };
}

export async function getAllTasks() {
  try {
    const snapshot = await db.collection('tasks').get();
    const tasksData = [];

    snapshot.forEach((doc) => {
      tasksData.push({ id: doc.id, ...doc.data() });
    });

    tasksData.sort((a, b) => {
      compareAsc(parseISO(a.dateCreated), parseISO(b.dateCreated));
    });

    return tasksData;
  } catch (error) {
    return error;
  }
}

export async function getUserTasks(userId) {
  const snapshot = await db.collection('tasks').where('uid', '==', userId).get();
  const tasks = [];

  snapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });

  tasks.sort((a, b) => {
    compareDesc(parseISO(a.dateCreated), parseISO(b.dateCreated));
  });

  return { tasks };
}
