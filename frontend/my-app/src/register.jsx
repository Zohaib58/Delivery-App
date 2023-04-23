import React, { useState } from 'react';
import axios from 'axios';

export const Register = (props) => {

    const [email, setEmail] = useState(''); // useState is a hook
    const [password, setPassword] = useState(''); // useState is a hook
    const [name, setName] = useState(''); // useState is a hook

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            email: email,
            password: password
        };
        axios.post('http://localhost:5000/api/users/', data).then(response => {
            // handle successful response
            console.log(response)
        })
        .catch(error => {
            // handle error
            console.log(error)
        });
    }

    return (
        
        <div className="auth-form-container">
             <form onSubmit={handleSubmit}>
                <label htmlFor="name"> name </label>
                <input value={name} onChange={e => setName(e.target.value)} type="name" placeholder = "User" id="name"  name="name"/>
                <label htmlFor="email">email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder = "email@email.com" id="email"  name="email"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder = "password" id="password"  name="password"/>
                <button type = "submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch("login")}>Already have an account? Log In </button>

        </div>
    )
}