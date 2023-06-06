import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../../components/DashboardHeader';
import SideBar from '../../../../components/Sidebar';
import sidebar_menu from '../../../../constants/sidebar-menu';
//import account from '../../data/accounts.js';
import '../../../styles.css';
import addData from '../../../../components/AddData/addData';
import {UploadImage, GetImageURL} from '../../../../components/ImageUpload';

function CreateProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
  
    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };

    const handleImageUpload = (url) => {
      setImage(url);
    };
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleQuantityChange = (event) => {
      setQuantity(parseInt(event.target.value));
    };

    const handlePriceChange = (event) => {
      setPrice(parseInt(event.target.value));
    };

    const handleDiscountChange = (event) => {
      setDiscount(parseInt(event.target.value));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let data = { 
        status: 0,
        name: productName,
        description: description,
        image: image,
        category: category,
        discount: discount,
        quantity: quantity,
        price: price,

      }
      addData('vapi/inventory/addProduct', data);
      setProductName('');
      setDescription('');
      setImage('');
      setCategory('');
      setPrice('');
      setDiscount('');
      setQuantity('');
    };
  
 
  
  
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />

      <div className="dashboard-body">
      <div className='dashboard-content'>
      <DashboardHeader btnText='New Order' />

      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>Create Product</h2>
        </div>

        <div>
          <label>Image:</label>
          <UploadImage onImageUpload={handleImageUpload}/>
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
            <label>Category:</label>
            <input type="text" value={category} onChange={handleCategoryChange} />
          </div>

          <div>
            <label>Discount:</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
          </div>

          <div>
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          </div>

          <div>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
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