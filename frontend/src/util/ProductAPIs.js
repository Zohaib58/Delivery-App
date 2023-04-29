import { AxiosBase } from './axiosSetup';

const GetAllProducts = async ({category}) => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.get(`/api/products/${category}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res;
};


const GetAProduct = async ({productID}) => {
    const token = localStorage.getItem('token');
    const res = await AxiosBase.get(`/api/products/product/${productID}`, {
        headers:{
            authorization: `Bearer ${token}`
        }
    });
    return res;
}

export { GetAllProducts, GetAProduct };
