import React from 'react'
import {Login} from '../Login-Register/Login'
import { Register } from '../Login-Register/Register';
import {useState} from 'react';

export default function HomePage() {
    const [DisplayForm, setDisplayForm] = useState('Login');

  const toggleForm = (formName) => {
    setDisplayForm(formName);
  }
  return(
    <>
    <div className='App '>
      {
        DisplayForm === "Login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
      }
    </div>
    </>
  );
}
