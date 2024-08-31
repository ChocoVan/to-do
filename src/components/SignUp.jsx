import React, { useState } from 'react'
import { auth, database } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { Auth, useAuth } from './Auth'
import './SignUp.css'

const SignUp = () => {
    const { authUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignUp = (e) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert("Account created.")
            })
            .catch((error) => {
                console.log(error);
            });
        
    };
    
    return (
        <div className='signup-container'>

            <form className='signup-form' onSubmit={userSignUp}>
                <h1>Create Account</h1>

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <input className='btn' type='submit' value="Sign Up"></input>
                <p>
                    Have an account?
                    <a href='/login'>Log In</a>
                </p>
            </form>
        </div>
    )
}

export default SignUp;