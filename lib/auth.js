import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './db';
import firebase from './firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = async () => {
    const response = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    return handleUser(response.user);
  };
  const signinWithTwitter = async () => {
    const response = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider());
    return handleUser(response.user);
  };
  async function signinWithGoogle() {
    const response = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return handleUser(response.user);
  }

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
      .then((window.location = '/'));

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithTwitter,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  };
};
