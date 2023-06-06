import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
//import account from '../../data/accounts.js';
import FetchDataComponent from '../../../components/ReadData/fetchData';
import '../../styles.css';

import {calculateRange, sliceData} from '../../../utils/table-pagination';


function ShowProfile() {
  const [data, setData] = useState(null);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchDataComponent('vapi/vendors/get');
        console.log("hjello")
        console.log(result)
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />

      <div className="dashboard-body">
      <div className='dashboard-content'>
      <DashboardHeader btnText='New Order' />

      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h2>My Profile</h2>
        </div>

        
          <>
            <div>
                <label>Company Name:</label>  
            </div>

            <div>
                <label>Created At:</label>
            </div>

            <div>
                <label>Status:</label>
            </div>
                
            <div>
                <label>Updated At:</label>
            </div>
            
            <div>
                <label>Website:</label>
            </div>
            
            <div>
                <label>ID:</label>
            </div>

          </>
      
      </div>
    </div>


      </div>

      </div>
      );
}

export default ShowProfile;
