import { AxiosBase } from './axiosSetup';

const LoginFunc = async({email, password}) => {
    const response = await AxiosBase.post('api/users/login', {email: email, password: password});
    return response;
}

const UserRegister = async({email, password})=> {
    const response = await AxiosBase.post('api/users/', {
        email: email,
        password: password, 
        role: 0,
    });
    return response;
}

const CustomerPost = async({customerId, name, phoneNo, address}) => {
    const token = localStorage.getItem('token');
    await AxiosBase.post('api/customer/',{
        customerId: customerId,
        name: name, 
        phoneNo: phoneNo,   
        status: 0, 
        address: address, 
        favourites: [],
    },{
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

const LogoutFunc = async() => {
    const token = localStorage.getItem('token');
    const res = await AxiosBase.post('/api/users/logout',{}, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })

    return res;

}

export {LoginFunc, UserRegister, CustomerPost, LogoutFunc}