import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../../components/DashboardHeader';
import SideBar from '../../../../components/Sidebar';
import sidebar_menu from '../../../../constants/sidebar-menu';
//import account from '../../data/accounts.js';
import '../../../styles.css';
import addData from '../../../../components/AddData/addData';
function CreateProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
  
    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleImageChange = (event) => {
      setImage(event.target.value);
    };
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle the form submission, e.g., send data to the server
      // You can access the entered data using the state variables (productName, description, image, category)
      // Perform your logic or API calls here
      console.log('Submitted Data:', productName, description, image, category);
      // Reset the form fields
      console.log(localStorage.getItem('userId'))
      let data = {
        vendorId: localStorage.getItem('userId'), 
        status: 0,
        productName,
        description,
        image,
        category
      }
      addData('vapi/inventory/addProduct', data);
      setProductName('');
      setDescription('');
      setImage('');
      setCategory('');
    };
  
 
  
  
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />

      <div className="dashboard-body">
      <div className='dashboard-content'>
      <DashboardHeader btnText='New Order' />

      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2> Create Product</h2>
        </div>

        <form onSubmit={handleSubmit}>
              <div>
                <label>Product Name:</label>
                <input type="text" value={productName} onChange={handleProductNameChange} />
              </div>

              <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={handleDescriptionChange} />
              </div>

              <div>
                <label>Image:</label>
                <input type="url" value={image} onChange={handleImageChange} />
              </div>

              <div>
                <label>Category:</label>
                <input type="number" value={category} onChange={handleCategoryChange} />
              </div>

              <button type="submit">Submit</button>
            </form>
      </div>
    </div>


      </div>

      </div>
      );
}

export default CreateProduct;