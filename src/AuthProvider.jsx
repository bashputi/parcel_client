import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "./firebase/firebase.config";
import useAxiosPublic from "../src/hooks/useAxiosPublic";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const handleUpdateProfile = (name, photo) => {
        console.log(auth.currentUser);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect (() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                // get Token and store Client info
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
           
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        googleSignIn,
        handleUpdateProfile,
        logOut
    };

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}