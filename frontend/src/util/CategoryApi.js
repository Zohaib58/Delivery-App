import { AxiosBase } from './axiosSetup';

const GetAllCategories = async () => {
  const res = await AxiosBase.get(`/sapi/categories/`)

  return res.data;
};

export {GetAllCategories}