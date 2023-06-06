import React, {useContext, useEffect, useState} from "react";
import { CartContext } from '../../context/cartContext';
import {GetAddressContact, UpdateAddressContact} from '../../data/customerApi'
import { CreateOrder } from "../../data/orderApi";
import { ActionButton } from '../../components/Buttons/mui-Buttons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import './orderstyles.css'

const OrderDetails = () => {
    const {cartItems} = useContext(CartContext);
    const [phoneNo, setContact] = useState(0);
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType]= useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [quantityError, setQuantityError] = useState('');
 
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
            const res= await CreateOrder({products, address, contact: phoneNo, paymentType:paymentType})
            if(res.data.success === false){
                setOpenSnackbar(true);
                setQuantityError(res.data.message);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                window.location.assign('/user/check-out');
            }

            setOpenSnackbar(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            window.location.assign('/user/orders')
        } catch(err) {
            console.error(err);
        }

    }

    const handleUpdateInfo = async() => {
        try{
            const res = await UpdateAddressContact({address: address, contact: phoneNo});
            if(res.status === 200) {
                setContact(res.data.phoneNo);
                setAddress(res.data.address);
            }
            else{
                console.error(res.error)
            }
        } catch (err) {
            console.error(err.message)
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
                        </div>
                    </form>
                    <button className="replace-address-button" onClick={handleUpdateInfo}>Replace Address/Contact</button>
                </div>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    {
                        quantityError==='' ? 
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ minWidth: 'auto' }}>
                            Order placed!
                        </Alert> : 
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ minWidth: 'auto' }}>
                            {quantityError}
                        </Alert>
                    }
                </Snackbar>
            </div>
        )  
}

export default OrderDetails;