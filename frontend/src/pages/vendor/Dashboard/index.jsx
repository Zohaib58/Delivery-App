// dashboard/index.jsx
import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
//import RootFile from '../../rootFile';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu'
import {calculateRange, sliceData} from '../../../utils/table-pagination';

import '../../styles.css';
import DoneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
import RefundedIcon from '../../../assets/icons/refunded.svg';

import FetchDataComponent from '../../../components/ReadData/fetchData';

console.log(FetchDataComponent('vapi/orders/'));


function Orders () {
      
    return(

            <div className = 'dashboard-container'>
                <SideBar menu = {sidebar_menu} />

                <div className = 'dashboard-body'>  

                </div>              
                
            </div>
            
            
        
        
    )
}

export default Orders;