import React, { useState } from 'react';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu-sa'
import DashboardHeader from '../../../components/DashboardHeader';
import '../../styles.css';
import addData from '../../../components/AddData/addData';

export const Category = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name,
        };
        
        const response = addData('sapi/categories/addCategory', data)
        console.log(response)
    }

    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-body'>
                
                <div className='dashboard-content'>

                <DashboardHeader
                    btnText="New Order" />

                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Orders List</h2>
                    </div>

                    
                        <div className="auth-form-container">
                            <h2>Add Category</h2>
                            <form className="register-form" onSubmit={handleSubmit}>
                                <label htmlFor="name"> Category Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="" />
                                <button type="submit">Add Category</button>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default Category;