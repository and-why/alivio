import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createNewProject(data) {
  const projectId = data.projectId;
  return firestore.collection('projects').doc(projectId).set(data);
}
export function createNewTask(data) {
  console.log(data);
  const taskId = data.taskId;
  return firestore.collection('tasks').doc(taskId).set(data);
}
