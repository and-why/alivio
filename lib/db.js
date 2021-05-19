import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createNewProject(uid, { projectName }, dateCreated) {
  return firestore.collection('projects').add({ uid, projectName, dateCreated });
}

export function getProjectData() {
  const projects = firestore.collection('projects');
  const data = projects
    .get()
    .then((querySnapshot) => {
      return querySnapshot;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return data;
}
