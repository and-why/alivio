import firebase from './firebase-admin';
import { compareDesc, parse, compareAsc, parseISO } from 'date-fns';

export async function getAllProjects() {
  const snapshot = await firebase.collection('projects').get();
  const projectsData = [];

  snapshot.forEach((doc) => {
    projectsData.push({ id: doc.id, ...doc.data() });
  });

  // projectsData.sort(compareDesc);
  return projectsData;
}

// export async function getUserProjects(userId) {
//   const snapshot = await firebase.collection('projects').where('uid', '==', userId).get();
//   const projectsData = [];

//   snapshot.forEach((doc) => {
//     projectsData.push({ id: doc.id, ...doc.data() });
//   });

//   projectsData.sort((a, b) => {
//     compareAsc(parseISO(a.dateCreated), parseISO(b.dateCreated));
//   });
//   return projectsData;
// }

export async function getAllTasks() {
  const snapshot = await firebase.collection('tasks').get();
  const tasksData = [];

  snapshot.forEach((doc) => {
    tasksData.push({ id: doc.id, ...doc.data() });
  });

  tasksData.sort((a, b) => {
    compareDesc(parseISO(a.dateCreated), parseISO(b.dateCreated));
  });

  return tasksData;
}

// export async function getUserTasks(userId) {
//   const snapshot = await firebase.collection('tasks').where('uid', '==', userId).get();
//   const tasksData = [];

//   snapshot.forEach((doc) => {
//     tasksData.push({ id: doc.id, ...doc.data() });
//   });

//   return tasksData;
// }

// export async function getSingleTask(taskId) {
//   const snapshot = await firebase.collection('tasks').where('taskId', '==', taskId).get();
//   console.log(snapshot);
// }
