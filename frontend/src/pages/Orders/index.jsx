import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';

import FetchDataComponent from '../../data/fetchData';
console.log(FetchDataComponent('vapi/orders/'));


function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await FetchDataComponent('vapi/orders/');
            console.log(result)
            setOrders(result);
            setPagination(calculateRange(result, 5));
            setOrders(sliceData(result, page, 5));
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [page]);
      
      const __handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
      
        if (value !== '') {
          const searchResults = orders.filter((order) =>
            order.first_name.toLowerCase().includes(value.toLowerCase()) ||
            order.last_name.toLowerCase().includes(value.toLowerCase()) ||
            order.product.toLowerCase().includes(value.toLowerCase())
          );
      
          setOrders(searchResults);
          setPagination(calculateRange(searchResults, 5));
          setPage(1);
        } else {
          setOrders(orders);
          setPagination(calculateRange(orders, 5));
          setPage(1);
        }
      };
      
      const __handleChangePage = (newPage) => {
        setPage(newPage);
        setOrders(sliceData(orders, newPage, 5));
      };
      
      
    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Order" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>Customer</th>
                        <th>PRODUCT</th>
                        <th>Cost</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order._id}</span></td>
                                    <td><span>{order.createdAt}</span></td>
                                    <td>
                                        <div>
                                            {order.status === 0 ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                          
                                            <span>{order.customerId}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.product}</span></td>
                                    <td><span>${order.cost}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders;