import logo from './logo.svg';
import './App.css';
import {react, useState} from 'react';
import {Login} from './login';
import {Register } from './register';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
        //<Login />
      }
    </div>
  );
}

export default App;
