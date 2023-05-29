import React, {useContext, useEffect, useState} from "react";
import { CartContext } from '../../context/cartContext';
import {GetAddressContact} from '../../util/customerApi'
import { CreateOrder } from "../../util/orderApi";
import { ActionButton } from '../../Components/Buttons/mui-Buttons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import './orderstyles.css'

const OrderDetails = () => {
    const { cartItems} = useContext(CartContext);
    const [phoneNo, setContact] = useState(0);
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType]= useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
 
    useEffect(()=> {
        const fetchinfo = async () => {
            try{
                const res = await GetAddressContact();
                setContact(res.data.phoneNo);
                setAddress(res.data.address);
            }
            catch(error) {
                console.log("Error in fetching user information");
            }
        }

        fetchinfo();
    },[])

    const products = cartItems.map((product) => {
        return {
          ProductID: product._id,
          Quantity: product.quantity,
        };
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

      
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setOpenSnackbar(true);
            const res= await CreateOrder({products, address, contact: phoneNo, paymentType:paymentType})
            window.location.assign('/user/orders')
        } catch(err) {
            console.error(err);
        }

    }
  
      return(
            <div className='detail-container'>
                <div className='detailForm-container'>
                    <form className='detail-form' onSubmit={handleSubmit}>
                        <div className='DetailFields'>
                            <div className='row1'>
                                <label className= "rowlabel" htmlFor="address">Address:</label>
                                <input className= "drow-input" value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="123 street, ABC society, City" id="address" name="address" />
                            </div>
                            <div className="row1">
                                <label className= "rowlabel" htmlFor='contact'>Contact:</label>
                                <input className= "drow-input" value={phoneNo} onChange={(e) => setContact(e.target.value)} type="number" placeholder="33xxxxxxxx" id="contact" name="contact" />
                            </div>
                            <div className="row1">
                                <label>Payment Type:</label>
                                <div className="radio-group">
                                    <div className="radio">
                                        <input type="radio" id="cod" name="paymentType" value="COD" checked={true} onChange={(e) => setPaymentType(0)} />
                                        <label htmlFor="cod">COD</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" id="card" name="paymentType" value="Card" checked={paymentType === "Card"} onChange={(e) => setPaymentType(1)} />
                                        <label htmlFor="card">Card</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <ActionButton buttonName={'Confirm Order'}/>
                            <button className="replace-address-button">Replace Address/Contact</button>
                        </div>
                    </form>
                </div>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ minWidth: 'auto' }}>
                Order placed!
                </Alert>
                </Snackbar>
            </div>
        )  
}

export default OrderDetails;