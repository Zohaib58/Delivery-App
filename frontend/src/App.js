import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import './App.css'


function App () {
  return(
    <Router>
      <AppRoutes/>     
    </Router>
  )
}

export default App;