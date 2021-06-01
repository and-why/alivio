import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const storage = firebase.storage();
const app = firebase.app();

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
export function uploadNewFile(data) {
  console.log('file', data);
  // const metadata = {
  //   name:
  // }
  // needs adding to firebase storage at some point
}

// STRIPE STUFF
export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IwED0G6mAzkRvCtSIRIzB1K',
      success_url: `${window.location.origin}/account`,
      cancel_url: `${window.location.origin}/account`,
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
export const goToBillingPortal = async () => {
  const functionRef = app
    .functions('australia-southeast1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`,
  });
  window.location.assign(data.url);
};
