import React,{ useState } from 'react';
import axios from 'axios';

export const Category = (props) => {
    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
           name: name,   
        };
        axios.post('http://localhost:5000/sapi/addCategory', data).then(response => {
            // handle successful response
            console.log(response.data)
        })
        .catch(error => {
            // handle error
            console.log(error)
        }); 

        console.log(name);
    }

    return (
    <div className="auth-form-container">
        <h2>Add Category</h2>
    <form className="register-form" onSubmit= {handleSubmit}>
    <label htmlFor="name"> Category Name</label>
    <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder=""/>
        <button type="submit">Add Category</button>
    </form>
        <button className= "link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here! </button>
    </div>
    )
}

export default Category;