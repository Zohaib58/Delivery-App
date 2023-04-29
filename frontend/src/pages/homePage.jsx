import React from 'react'
import {Login} from '../Components/Login'
import { Register } from '../Components/Register';
import {useState} from 'react';

export default function HomePage() {
    // const handleChange=()=> {
    //     alert('button click')
    // }

    // return (
    //     <>
    //         <div>
    //             DISPLAY ON HOME PAGE
    //         </div>
    //         <ActionButton Name="TEST1" onClick= {()=>handleChange()}></ActionButton>
    //     </>

    // )

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
