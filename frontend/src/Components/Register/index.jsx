import React, {useState} from 'react';
import { ActionButton, LinkButton } from '../Buttons/mui-Buttons';
import './styles.css'
import {AxiosBase} from '../../util/axiosSetup'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [phoneNo, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [cpass, setCPass] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPass, setIsValidPass] = useState(true);
    const [passCheck, setPassCheck] = useState(true);
    const status = 1;
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(email);
        setIsValidEmail(isValid);
        
        if (!isValid) {
            return;
        }

        if(pass !== cpass){
            setPassCheck(false)
            return;
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const check = passwordPattern.test(pass)
        if(!check){
            setIsValidPass(false)
            return;
        }
        try{
            const response1 = await AxiosBase.post('api/users/', {
                email: email,
                password: pass, 
                role: 1,
            });
            // console.log(response1)
            // localStorage.setItem('token', response1.data.token)
            // const token = localStorage.getItem('token');
            // await AxiosBase.post('api/customer/',{
            //     customerId: response1.data._id,
            //     name: name, 
            //     phoneNo: phoneNo,   
            //     status: status, 
            //     address: address, 
            //     favourites: [],
            // },{
            //     headers: {
            //         'authorization': `Bearer ${token}`
            //     }
            // })
            window.location.assign('/');
            return null;
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <div className='auth-register-Form'>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className='inputFields'>
                    <div className="column-left">
                        <div className="row">
                            <label htmlFor="email">Email</label>
                            <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" style={{ borderColor: isValidEmail ? 'initial' : 'green',}}/>
                            {!isValidEmail && <span style={{color:"red"}}>Enter a valid Email</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="password">Password</label>
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password" />
                            {!isValidPass && <span style={{color:"red"}}>Password must be atleast of length 8 with atleast one letter and digit</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input value={cpass} onChange={(e) => setCPass(e.target.value)} type="password" id="cpassword" name="cpassword" />
                            {!passCheck && <span style={{color:"red"}}>Passwords don't match</span>}
                        </div>
                    </div>

                    <div className="column-right">
                        <div className="row">
                            <label htmlFor="name">Name</label>
                            <input value= {name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" />
                        </div>
                        <div className='row'>
                            <label htmlFor="address">Address</label>
                            <input value= {address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="123 street, ABC society, City" id="address" name="address" />
                        </div>
                        <div className="row">
                            <label htmlFor='contact'>Contact</label>
                            <input value= {phoneNo} onChange={(e) => setContact(e.target.value)} type="number" placeholder="33xxxxxxxx" id="contact" name="contact" />
                        </div>
                    </div>
                </div>
                <ActionButton buttonName={'Sign Up'}/>
            </form>
            <LinkButton buttonName={"Sign In"} props={props} text={"Login"}></LinkButton>
        </div>
    )
}