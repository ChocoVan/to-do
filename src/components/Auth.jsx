// use this component to check if user is authenticated
// so only data associated with user can be fetched in other components

import React, { createContext, useContext, useEffect, useState} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

// create a context object which will be used to share data across components
const AuthContext = createContext();

// allows for components to easily access the context
export const useAuth = () => useContext(AuthContext);

export const Auth = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    
    useEffect(() => {
        // when user signs in
        const seeAuth = onAuthStateChanged(auth, (user) => {
            if (user) { // if user exists in auth db
                setAuthUser({ // set current user id and email
                    uid: user.uid,
                    email: user.email,
                });
            }
            else {
                setAuthUser(null); // user doesn't exist in db so no info for guest user
            }
        });

        return () => seeAuth();

    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Signed out.");
        })
        .catch((error) => console.log(error));
    };

    return (
        <AuthContext.Provider value={{ authUser, userSignOut }}>
            { children }
        </AuthContext.Provider>
    )
};