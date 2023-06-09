import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/white-logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import {LogoutFunc} from '../../data/userApi'

function SideBar ({ menu }) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    const handleLogout = async() => {
        const res = await LogoutFunc();
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location.assign('/')
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img
                        src={logo}
                        alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <button className='sidebar-footer' onClick={handleLogout}>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;