import { useState, useEffect } from 'react';

export const useToken = () => {
  //const [token, setToken] = useState(null); // Use useState to manage token state

  //useEffect(() => {
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

        const data = await response.json();
        //setToken(data.token); // Update token state with the fetched token
        localStorage.setItem('token', data.token); // Store token in local storage

        console.log(data.token);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };

    fetchToken();

    const storedToken = localStorage.getItem('token');
    
    // Do something with storedToken if needed

  //}, []);

  //return token;
};

export default useToken;