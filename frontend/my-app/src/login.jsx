import React, { useState } from 'react';
import axios from 'axios';
export const Login = (props) => {
    const [email, setEmail] = useState(''); // useState is a hook
    const [password, setPassword] = useState(''); // useState is a hook

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        };
        axios.post('http://localhost:5000/api/users/login', data).then(response => {
            // handle successful response
            console.log(response.data.token)
        })
        .catch(error => {
            // handle error
            console.log(error)
        });

    }

    return (
        
        <div className = "auth-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder = "email@email.com" id="email"  name="email"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder = "password" id="password"  name="password"/>
                <button type = "submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch("Register")}>Don't have an account? Register</button>
        
        </div>
        
    )
}
