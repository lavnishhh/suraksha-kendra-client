import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../controllers/firebase/main';
import { GLOBAL_LOADING_STATE } from './constsants';

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {

    // user state
    const [user, setUser] = useState(GLOBAL_LOADING_STATE);
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={
            {user: user}}>
            {children}
        </UserContext.Provider>
    );
};

