import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
//import account from '../../data/accounts.js';
import '../../styles.css';
let account = [1,2,3]
function Orders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await account();
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

        {data && (
          <>
            <div>
                <label>Company Name:</label>  {data[0].companyName}
            </div>

            <div>
                <label>Created At:</label> {data[0].createdAt}
            </div>

            <div>
                <label>Status:</label> {data[0].status}
            </div>
                
            <div>
                <label>Updated At:</label> {data[0].updatedAt}
            </div>
            
            <div>
                <label>Website:</label> {data[0].website}
            </div>
            
            <div>
                <label>ID:</label> {data[0]._id}
            </div>

          </>
        )}
      </div>
    </div>


      </div>

      </div>
      );
}

export default Orders;
