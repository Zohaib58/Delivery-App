import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import account from '../../data/accounts.js';
import '../styles.css';

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
  );
}

export default Orders;
