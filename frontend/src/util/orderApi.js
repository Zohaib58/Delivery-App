import { AxiosBase } from './axiosSetup';

const CreateOrder = async ({products, address, contact, paymentType}) => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.post(`/api/orders/createOrder`,{
    products: products,
    address: address,
    contact: contact,
    paymentType: paymentType
  },{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res;
};

const GetOrders = async() => {
  const token = localStorage.getItem('token');

  const res = await AxiosBase.get('/api/orders',{
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return res;
}

const GetAOrder = async({id})=> {
  const token = localStorage.getItem('token');

  const res = await AxiosBase.get(`/api/orders/order/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return res;
}

export {CreateOrder, GetOrders, GetAOrder}
