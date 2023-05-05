import React, { useContext, useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// creating context
const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

// creating provider
export const AuthProvider = ({ children }) => {
  // creating a global state for logged in user
  const [currentUser, setCurrentUser] = useState(null);

  // functions for signing up, logging in, and logging out
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [])

  const value = { currentUser, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
