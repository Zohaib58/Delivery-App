import { AxiosBase } from './axiosSetup';

const GetAllCategories = async () => {
  const token = localStorage.getItem('token');
  const res = await AxiosBase.get(`/sapi/categories/`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return res.data;
};

export {GetAllCategories}