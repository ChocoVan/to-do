import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                window.location.href = '/';
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={logIn}>
                <div className='login'>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <input className='submit-btn' type='submit' value="Sign In"></input>
                </div>
                <p>
                    Don't have an account?
                    <a href='/signup'>Sign Up</a>
                </p>
            </form>
        </div>
    )
}

export default Login