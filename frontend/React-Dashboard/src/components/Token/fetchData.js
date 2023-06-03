import { useState, useEffect } from 'react';

let data = null
export async function FetchDataComponent (route){
    const fetchToken = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: 'ali@gmail.com',
              password: '123'
            })
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch token');
          }
          
          //console.log('hello')
        
          const data = await response.json();
          
          console.log(data.token);
        
          //setToken(data.token); // Update token state with the fetched token
          localStorage.setItem('token', data.token); // Store token in local storage
  } catch (error) {
          console.error('Failed to fetch token:', error);
        }
      };

      await fetchToken()
      const FetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            //console.log('hello')
            console.log(token)
            
            //console.log(apiUrl)
            const response = await fetch('http://localhost:5000/api/customer/get/U29', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            data = await response.json();
    
        } catch (error) {
            console.error('Failed to fetch data: ', error);
            return null;
        }
    };
    await FetchData();
    //console.log(data)
    return data;
}
console.log(FetchDataComponent())
export default FetchDataComponent;
//export default data;