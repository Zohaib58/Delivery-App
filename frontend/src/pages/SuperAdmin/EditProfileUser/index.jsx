import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {FetchDataComponent}  from '../../../components/ReadData/fetchData';
import {UpdateDataComponent}  from '../../../components/UpdateData/updateData';

export const UpdateUser = (props) => {

  const [name, setEmail] = useState('');
  const [phoneNo, setPass] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    FetchDataComponent('/api/customer/get')
      .then((data) => {
        //console.log(data)
        setEmail(data.name);
        setPass(data.phoneNo);
        setAddress(data.address);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      phoneNo,
      address,
    };

    const response = UpdateDataComponent('/api/customer/edit', updatedData);
    /*
    do wtv u want with the response
    */

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
    
    </div>
  );
};

export default UpdateUser;
