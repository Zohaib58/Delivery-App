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

export {GetAddressContact};