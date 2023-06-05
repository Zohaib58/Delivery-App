// dashboard/index.jsx
import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
//import RootFile from '../../rootFile';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu-sa'

import '../../styles.css';



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