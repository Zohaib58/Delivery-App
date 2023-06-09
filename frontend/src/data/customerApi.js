import { AxiosBase } from './axiosSetup';

const GetAddressContact = async () => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.get(`/api/customer/get`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res;
};

const UpdateAddressContact = async({address, contact}) => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.put('/api/customer/edit', {
    address: address,
    contact: contact,
  },{
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return res;
}

const Deactivate = async() => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.delete('/api/customer/delete',{
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return res;

}

export {GetAddressContact, UpdateAddressContact, Deactivate};