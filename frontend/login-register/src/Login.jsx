import React, { useState } from "react";
import axios from 'axios';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: pass
        };
        axios.post('http://localhost:5000/api/users/login', data).then(response => {
            // handle successful response
            console.log(response.data.token)
        })
        .catch(error => {
            // handle error
            console.log(error)
        }); 

        console.log(email);
    }

    

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="register-form" onSubmit= {handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="****" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
                <button className= "link-btn" onClick={() => props.onFormSwitch('register')}>Dont have an account? Register here! </button>
            </div>
    )
}