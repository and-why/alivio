import firebase from './firebase';
import getStripe from './stripe';

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
  const taskId = data.taskId;
  return firestore.collection('tasks').doc(taskId).set(data);
}
export function editTask(data) {
  console.log(data);
  const taskId = data.taskId;
  return firestore.collection('tasks').doc(taskId).set(data);
}
export function createNewSection(data) {
  const sectionId = data.sectionId;
  return firestore.collection('section').doc(sectionId).set(data);
}

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IwED0G6mAzkRvCtSIRIzB1K',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
