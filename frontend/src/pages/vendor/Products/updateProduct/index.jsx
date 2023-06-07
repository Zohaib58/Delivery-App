import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../../components/DashboardHeader';
import SideBar from '../../../../components/Sidebar';
import sidebar_menu from '../../../../constants/sidebar-menu';
import '../../../styles.css';
import FetchDataComponent from '../../../../components/ReadData/fetchData';
import UpdateDataComponent from '../../../../components/UpdateData/updateData';
import {UploadImage, GetImageURL} from '../../../../components/ImageUpload';

function UpdateProduct() {
  const [data, setData] = useState(null);
  const [dataInventory, setDataInventory] = useState(null); // [1]
  const [updatedData, setUpdatedData] = useState(null);
  const [updatedDataInventory, setUpdatedDataInventory] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = localStorage.getItem('productId');
        const result = await FetchDataComponent(`vapi/inventory/${productId}`);
        setData(result);
        setUpdatedData(result[0]);

        const resultInventory = await FetchDataComponent('vapi/inventory/');
        const matchingProduct = resultInventory.find((product) => product.pid === productId);
        setDataInventory(matchingProduct);
        setUpdatedDataInventory(matchingProduct);
        setImageURL(result[0].image)

        //console.log(matchingProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const handleChange = (event, field) => {
    if (field in updatedData) {
      setUpdatedData((prevData) => ({
        ...prevData,
        [field]: event.target.value,
      }));
    }  if (field in updatedDataInventory) {
      setUpdatedDataInventory((prevDataInventory) => ({
        ...prevDataInventory,
        [field]: event.target.value,
      }));
    }
  };

  const handleUpdate = () => {
    // Perform the necessary update actions using the updatedData state
    const concatenatedData = {
        category: updatedData.category,
        description: updatedData.description,
        image: imageURL,
        name: updatedData.name,
        status: data[0].status,
        vendor: data[0].vendor,
        productId: data[0]._id,
        discount: updatedDataInventory.discount,
        quantity: updatedDataInventory.quantity,
        price: updatedDataInventory.price,
      };

    console.log(concatenatedData); // console
    // Call an API, update the database, or perform any other update logic
    UpdateDataComponent('vapi/inventory/product/editProduct', concatenatedData );
  };

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-body">
        <div className="dashboard-content">
          <DashboardHeader btnText="New Order" />
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Update Product</h2>
            </div>

            {data && (
              <>
                <div>
                  <label>Category:</label>
                  <input
                    type="text"
                    value={updatedData.category}
                    onChange={(e) => handleChange(e, 'category')}
                  />
                </div>

                <div>
                  <label>Description:</label>
                  <input
                    type="text"
                    value={updatedData.description}
                    onChange={(e) => handleChange(e, 'description')}
                  />
                </div>

                <div>
                  <label>Image:</label>
                  <img src={imageURL} alt="Product Image" />
                  <UploadImage onImageUpload={handleImageUpload}/>
                </div>

                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => handleChange(e, 'name')}
                  />
                </div>

                <div>
                  <label>Status:</label>
                  <input
                    type="number"
                    value={data[0].status}
                    onChange={(e) => handleChange(e, 'status')}
                  />
                </div>

                <div>
                  <label>Vendor:</label>
                  <input
                    type="text"
                    value={data[0].vendor}
                    onChange={(e) => handleChange(e, 'vendor')}
                  />
                </div>

                <div>
                  <label>Size:</label>
                  <input
                    type="text"
                    value={data[0].size}
                    onChange={(e) => handleChange(e, 'size')}
                  />
                </div>


                {dataInventory && (
                  <>
                    <div>
                      <label>Discount:</label>
                      <input
                        type="number"
                        value={updatedDataInventory.discount}
                        onChange={(e) => handleChange(e, 'discount')}
                      />
                    </div>

                    <div>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        value={updatedDataInventory.quantity}
                        onChange={(e) => handleChange(e, 'quantity')}
                      />
                    </div>

                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        value={updatedDataInventory.price}
                        onChange={(e) => handleChange(e, 'price')}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;

