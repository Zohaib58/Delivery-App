import React, {useEffect, useState} from "react";
import {GetOrders, GetAOrder} from '../../util/orderApi'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from "@mui/material";
import { SingleOrder } from "../../Components/singleOrder/singleOrder";


const DisplayOrders = () =>{
    const [orders, setOrders] = useState([]);
    const [selectedorder, setOrder] = useState('');
    useEffect(() => {
        const fetchorders = async () => {
            try{
                const res = await GetOrders();
                setOrders(res.data.ordersDisplay);
            }
            catch(error) {
                console.log("Error in fetching user orders");
            }
        }

        fetchorders();
    },[])

    const handleOrderDisplay = async({orderId})=> {
        setOrder(orderId);
    }

    return(
        <div>
            <h1>Orders</h1>
            <div className="order-table-container" style={{width:'900px', hieght:'500px', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <TableContainer component= {Paper}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment Type</TableCell>
                                <TableCell>Price (PKR)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.map((row) => (
                                    <TableRow 
                                        key={row.orderId} 
                                        sx= {{'&:last-child td, &:last-child th' : { border: 0}}}
                                    >
                                        <TableCell align="center">
                                            <button id={row.orderId} onClick={()=>handleOrderDisplay({orderId: row.orderId})}>{row.orderId}
                                            </button>
                                        </TableCell>
                                        <TableCell>{row.orderDate}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.paymentType}</TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {
                selectedorder && (
                    <SingleOrder orderID={selectedorder}/>
                )
            }
        </div>
    )
}



export {DisplayOrders};