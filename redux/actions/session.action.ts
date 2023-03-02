import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import Router from 'next/router';

import { deleteItem, setItem } from '../../utils/sessionStorage';
import { revokeSession, setUser } from '../slices/session.slice';
import { auth, db } from '../../utils/firebase';

export const signInPassword = createAsyncThunk<any, any>(
  'session/signInPassword',
  async ({ email, password }, { dispatch }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const q = query(collection(db, 'agents'), where('id', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length > 0) {
      const [userSession] = docs.docs.map((doc) => doc.data());

      setItem('SESSION_TOKEN', user.uid);
      setItem('USER_INFO', userSession);

      Router.push('/');
      return dispatch(setUser(userSession));
    }
  },
);

export const signInGoogle = createAsyncThunk<any>(
  'session/signInGoogle',
  async (_, { dispatch }) => {
    const googleProvider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, googleProvider);

    const { user } = res;
    console.table(user);
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    let userSession = null;
    if (docs.docs.length === 0) {
      userSession = {
        id: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      };
      await addDoc(collection(db, 'users'), userSession);
    } else {
      // eslint-disable-next-line prefer-destructuring
      userSession = docs.docs.map((doc) => doc.data())[0];
    }

    setItem('SESSION_TOKEN', user.uid);
    setItem('USER_INFO', userSession);

    Router.push('/');
    return dispatch(setUser(userSession));
  },
);

export const logout = createAsyncThunk<any>('session/logout', async (_, { dispatch }) => {
  deleteItem('SESSION_TOKEN');
  deleteItem('USER_INFO');
  signOut(auth);
  dispatch(revokeSession());

  Router.push('/login');
});
