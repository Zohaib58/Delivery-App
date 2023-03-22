import logo from './logo.svg';
import './App.css';
import {Button, Form} from 'react-bootstrap';
import { BasicExample } from './components/card';
import { PrimaryButton } from './components/buttons';



function App() {
  return (
    <div className="App">
      React App
      <Button>Test</Button>
      <BasicExample>

      </BasicExample>

      <PrimaryButton></PrimaryButton>
    </div>

  );
}



export default App
