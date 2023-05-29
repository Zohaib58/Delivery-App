import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button} from "@mui/material";
import { GetAOrder } from '../../util/orderApi';
import './Orderstyles.css'

const SingleOrder = ({orderID}) => {
    const [order, setOrder] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [orderCancellable, setOrderCancel] = useState(true);

    useEffect(() => {
        setShowDialog(true);
        const fetchOrder = async ({orderId}) => {
            const res = await GetAOrder({id: orderId});
            setOrder(res.data.orderWithAllInfo[0]);
            if(order.status === "Confirmed" || order.status === "In Process"){
                setOrderCancel(true)
            }
        }

        fetchOrder({orderId: orderID});
    }, [orderID]);

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const CancelOrder = ({orderID}) => {

    }

    return(
        <div>
            {showDialog && (
                <div className='orderDialogContainer'>
                    <div className='orderDialog'>
                        <button className='orderdialog-button' style={{ textAlign: 'right', marginLeft: 'auto' }} onClick={handleCloseDialog}>X</button>
                        <p className='OrderID'> <strong>Order ID: {order.orderId} </strong></p>
                        <p><strong>Date:</strong> {order.orderDate}</p>
                        <p><strong>Payment:</strong> {order.paymentType}</p>
                        <p><strong>Amount:</strong> PKR {order.amount}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        {
                            orderCancellable ? (
                                <Button variant="outlined" color="error" onClick={() => CancelOrder(order.orderId)}>
                                    Cancel order
                                </Button>
                                
                            ) : (
                                <Button disabled>Cancel Order</Button>
                            )
                        }
                        <div className='orderTableContainer'>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Company</TableCell>
                                            <TableCell>Price(PKR)</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.subOrders?.map((subOrder) =>
                                            subOrder.products?.map((product) => (
                                                <TableRow key={product.name}>
                                                    <TableCell><img className='pimg' src={product.image} alt={product.name} style={{width:'100px',height:'100px'}} /></TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.vendor}</TableCell>
                                                    <TableCell>{product.price}</TableCell>
                                                    <TableCell>{product.quantity}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export { SingleOrder }
