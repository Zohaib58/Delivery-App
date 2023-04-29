import React, {useState} from 'react';
import {ActionButton, LinkButton} from '../Buttons/mui-Buttons'
import './styles.css'
import {AxiosBase} from '../../util/axiosSetup'

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try{
            const response = await AxiosBase.post('api/users/login', {email: email, password: pass});
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.id)
            if(response.data.role === 0){
                window.location.assign('/vendor/dashboard');
            }
            else if(response.data.role === 1){
                window.location.assign('/user/dashboard');
            }
            else if(response.data.role === 2){
                window.location.assign('/DP/dashboard');
            }
            else{
                window.location.assign('/SA/dashboard');
            }
            localStorage.removeItem('cartItems')
            return null;
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <div className='auth-login-Form'>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" />
                <label htmlFor="password">Password: </label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <ActionButton buttonName={"Log In"}></ActionButton>
                <LinkButton buttonName={"Create account"} props={props} text={'Register'}/>
            </form>
        </div>
    )
}