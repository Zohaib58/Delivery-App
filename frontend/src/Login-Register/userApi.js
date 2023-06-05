import { AxiosBase } from './axiosSetup';

const LoginFunc = async({email, password}) => {
    const response = await AxiosBase.post('api/users/login', {email: email, password: password});
    return response;
}

const UserRegister = async({email, password})=> {
    const response = await AxiosBase.post('api/users/', {
        email: email,
        password: password, 
        role: 1,
    });

    return response;
}

const CustomerPost = async({customerId, name, phoneNo, status, address}) => {
    const token = localStorage.getItem('token');
    await AxiosBase.post('api/customer/',{
        customerId: customerId,
        name: name, 
        phoneNo: phoneNo,   
        status: status, 
        address: address, 
        favourites: [],
    },{
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

export {LoginFunc, UserRegister, CustomerPost}