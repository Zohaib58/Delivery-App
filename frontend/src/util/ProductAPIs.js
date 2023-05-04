import { AxiosBase } from './axiosSetup';

const GetAllProducts = async ({category, keyword}) => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.get(`/api/products/${category}/${keyword}`, {
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

const toggleFav = async({productID}) => {
  const token = localStorage.getItem('token');
  const res= await AxiosBase.post('/api/products/toggleFav',{
    productId: productID
  },{
    headers:{
      authorization: `Bearer ${token}`
    } 
  })

  return res;
}

export { GetAllProducts, GetAProduct, toggleFav };
