import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button} from "@mui/material";
import { GetAOrder, CancelOrder } from '../../util/orderApi';
import './Orderstyles.css'

const SingleOrder = ({orderID}) => {
    const [order, setOrder] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [orderCancellable, setOrderCancel] = useState(true);

    useEffect(() => {
        setShowDialog(true);
        const fetchOrder = async ({orderId}) => {
            const res = await GetAOrder({id: orderId});
            setOrder(res.data.orderWithAllInfo[0])
        }

        fetchOrder({orderId: orderID});
    }, [orderID]);

    useEffect( () => {
        if(order.status === "Confirmed" || order.status === "In Process"){
            setOrderCancel(true)
        }
        else if(order){
            setOrderCancel(false)
        }
    }, [order])

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleCancelOrder = async () => {
        const res = await CancelOrder({id: order.orderId});
        if (res.data.success === true) {
            setOrderCancel(false)
        }
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
                                <Button variant="outlined" color="error" onClick={handleCancelOrder}>
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
