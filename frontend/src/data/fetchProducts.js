import axios from 'axios';

export const FetchProducts = async () => {
  const token = localStorage.getItem('token');
  let data = null;

  try {
    const response = await axios.post('http://localhost:5000/api/products/vendorProducts/', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      data = response.data;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  console.log(data);
  return data;
};

export default FetchProducts;
