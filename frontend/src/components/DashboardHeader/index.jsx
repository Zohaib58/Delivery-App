import React from 'react';

import './styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

function DashboardHeader({ btnText, onClick, extraButtons }) {
    return (
      <div className='dashbord-header-container'>
        {btnText && (
          <button className='dashbord-header-btn' onClick={onClick}>
            {btnText}
          </button>
        )}
  
        {extraButtons && extraButtons.length > 0 && (
          <div className='dashbord-header-extra-buttons'>
            {extraButtons.map((button, index) => (
              <button
                key={index}
                className='dashbord-header-extra-btn'
                onClick={button.onClick}
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
  
        <div className='dashbord-header-right'>
          <img
            src={NotificationIcon}
            alt='notification-icon'
            className='dashbord-header-icon'
          />
          <img
            src={SettingsIcon}
            alt='settings-icon'
            className='dashbord-header-icon'
          />
          <img
            className='dashbord-header-avatar'
            src='https://reqres.in/img/faces/9-image.jpg'
          />
        </div>
      </div>
    );
  }
  
  export default DashboardHeader;
  