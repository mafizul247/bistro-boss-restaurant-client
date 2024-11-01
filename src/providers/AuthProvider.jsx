import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [control, setControl] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(false);
        return signOut(auth);
    }

    const userProfileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Auth User', currentUser);
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', { email: currentUser?.email })
                    .then(data => {
                        const token = data.data.token;
                        // console.log(token);
                        localStorage.setItem('access-token', token);
                        setLoading(false);
                    }).catch(error => console.log(error))
            } else {
                localStorage.removeItem('access-token');
            }
            
        });
        return () => {
            return unsubscribe();
        }

    }, [control, setLoading]);

    const authInfo = {
        user,
        loading,
        setControl,
        createUser,
        loginUser,
        logOut,
        userProfileUpdate,
        googleLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;