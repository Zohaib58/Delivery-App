import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {FetchDataComponent}  from '../../components/Token/fetchData';
//import data from '../../components/Token/fetchData';

//console.log(FetchDataComponent());
//const token = localStorage.getItem('token');
           // console.log(token)

export const UpdateUser = (props) => {
  const [name, setEmail] = useState('');
  const [phoneNo, setPass] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    FetchDataComponent()
      .then((data) => {
        //console.log(data)
        setEmail(data[0].name);
        setPass(data[0].phoneNo);
        setAddress(data[0].address);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: name,
      phoneNo: phoneNo,
      address: address,
    };

    axios
      .put('http://localhost:5000/api/customer/edit/U29', updatedData)
      .then((response) => {
        // handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

   //console.log(name);
  //console.log(phoneNo);
   };
   

  return (
    <div className="auth-form-container">
      <h2>Update</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Name</label>
        <input
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          type="name"
          id="email"
          name="email"
        />
        <label htmlFor="email">Phone Number</label>
        <input
          value={phoneNo}
          onChange={(e) => setPass(e.target.value)}
          type="phone"
          id="email"
          name="email"
        />
          <label htmlFor="email">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="address"
          id="email"
          name="email"
        />
       
        <button type="submit">Update</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here!
      </button>
    </div>
  );
};

export default UpdateUser;
