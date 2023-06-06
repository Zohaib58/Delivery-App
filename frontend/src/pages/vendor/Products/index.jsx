import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../../components/DashboardHeader';

//import all_products from '../../data/products.js';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu'
import {calculateRange, sliceData} from '../../../utils/table-pagination';

import '../../styles.css';
import DoneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
import RefundedIcon from '../../../assets/icons/refunded.svg';

import FetchDataComponent from '../../../components/ReadData/fetchData';
function ProductsDisplay () {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await FetchDataComponent('vapi/inventory/getProducts');
            console.log("hjello")
            console.log(result)
            setProducts(result);
            setPagination(calculateRange(result, 5));
            setProducts(sliceData(result, page, 5));
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [page]);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = products.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setProducts(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setProducts(sliceData(products, new_page, 5));
    }

    const handleUpdate = (productId) => {
        // Perform the necessary actions when the Update button is clicked
        // You can navigate to the update page or trigger a modal, for example
        console.log(`Update button clicked for product with ID: ${productId}`);
      };
      
    return(
        <div className="dashboard-container">
             <SideBar menu={sidebar_menu} />
             <div className="dashboard-body">
             <div className='dashboard-content'>
             <DashboardHeader
             btnText="New Product"
             onClick={() => { window.location.href = '/vapi/products/createProduct'; }}
             extraButtons={[
            { text: 'Update Product' , onClick: () => { window.location.href = '/vapi/products/updateProduct'}},
         { text: 'Delete' , onClick: () => { window.location.href = '/vapi/products/updateProduct'}}
    // Add more button objects as needed
  ]}
/>
           
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Products List</h2>
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
                        <th>NAME</th>
                        <th>PRODUCT</th>
                        <th>REVENUE</th>
                        <th>ACTIONS</th> {/* Add Actions column */}
                    </thead>

                    { 
                    products.length !== 0 ?
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td><span>{product._id}</span></td>
                                    <td><span>{product.createdAt}</span></td>
                                    <td>
                                        <div>
                                            {product.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : product.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : product.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{product.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                          
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <div class = "imgTd">
                                        <td><span><img src={product.product} style={{ width: '50%', height: '20%' }} /></span></td>
                                    </div>
                                    
                                    <td><span>RS{product.price}</span></td>
                                    <td>
                                        <span>
            <button onClick={() => handleUpdate(product.id)}>Update</button> {/* Add update button */}
                                </span>
          </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {products.length !== 0 ?
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
            
            
            </div>    
        </div>
        
    )
}

export default ProductsDisplay;