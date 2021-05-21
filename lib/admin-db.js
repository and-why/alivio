import firebase from './firebase-admin';

export async function getAllTasks(userId) {
  const snapshot = await firebase.collection('tasks').where('uid', '==', userId).get();
  const tasksData = [];

  snapshot.forEach((doc) => {
    tasksData.push({ id: doc.id, ...doc.data() });
  });

  return tasksData;
}

export async function getAllProjects(userId) {
  const snapshot = await firebase.collection('projects').where('uid', '==', userId).get();
  const projectsData = [];

  snapshot.forEach((doc) => {
    projectsData.push({ id: doc.id, ...doc.data() });
  });

  return projectsData;
}
