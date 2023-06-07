import React, { useEffect,useState } from 'react';
import {FetchDataComponent}  from '../../components/ReadData/fetchData';
import {UpdateDataComponent}  from '../../components/UpdateData/updateData';
import { LogoutFunc } from '../../data/userApi';
import { Deactivate } from '../../data/customerApi';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import './profile.css'

export const UpdateCustomer = () => {

  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    FetchDataComponent('api/customer/get')
      .then((data) => {
        console.log(data)
        setName(data.name);
        setPhoneNo(data.phoneNo);
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

    const response = UpdateDataComponent('api/customer/edit', updatedData);
    setOpenSnackbar(true);

  };
  
  const handleLogout = async() => {
    const res = await LogoutFunc();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.assign('/')
  }

  const handleDeactivate = async() => {
    const res = await Deactivate();
    window.location.assign('/')
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
   
   

  return (
    <div>
      <header className="profile-header-container">
        <button className="home-button" onClick={() => window.location.assign('/user/dashboard')}>
          Dashboard
        </button>
        <h3 className="heading-profile">PROFILE</h3>
        <button className="profile-logout-button" onClick={handleLogout}>Log Out</button>
      </header>
      <div className="profile-form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          id="Name"
          name="Name"
        />
        <label htmlFor="Contact">Phone Number</label>
        <input
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          type="phone"
          id="Contact"
          name="Contact"
        />
          <label htmlFor="Address">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="address"
          id="Address"
          name="Address"
        />
       
        <button type="submit">Update</button>
      </form>
      <button className='profile-deactive' onClick={handleDeactivate}>Deactivate</button>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ minWidth: 'auto' }}>
          Profile updated!
        </Alert>
        </Snackbar>
    </div>
  );
};

export default UpdateCustomer;
