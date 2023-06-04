import React, { useEffect, useState } from 'react';
import { GetOrders } from '../../data/orderApi';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { SingleOrder } from '../../Components/singleOrder/singleOrder';
import { LogoutFunc } from '../../data/userApi';
import './style.css';

const DisplayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await GetOrders();
        if(res.data!=="No orders yet.") {
            setOrders(res.data);
        }
      } catch (error) {
        console.log('Error in fetching user orders');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderDisplay = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleLogout = async() => {
    const res = await LogoutFunc();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.assign('/')
  }

  return (
    <div>
      <header className="order-header-container">
        <button className="home-button" onClick={() => window.location.assign('/user/dashboard')}>
          Dashboard
        </button>
        <h3 className="heading-order">ORDERS</h3>
        <button className="order-logout-button" onClick={handleLogout}>Log Out</button>
      </header>
      <div className="order-table-container">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
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
              {orders.map((row) => (
                <TableRow
                  key={row.orderId}
                  onClick={() => handleOrderDisplay(row.orderId)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell>{row.orderDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.paymentType}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedOrder && <SingleOrder orderID={selectedOrder} />}
    </div>
  );
};

export { DisplayOrders };
