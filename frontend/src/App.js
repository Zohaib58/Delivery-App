import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import OrderList from './components/OrderList';


function App() {
  const [dataProvider, setDataProvider] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: 'zohaibazam58@gmail.com',
            password: '2'
          })
        });
        const data = await response.json();
        console.log(data.token);
        

        const authHeader = `Bearer ${data.token}`;
        const dataProvider = simpleRestProvider('http://localhost:5000/vapi/orders/', {
          headers: {
            Authorization: authHeader
          }
        });
        console.log(dataProvider)

        setToken(data.token);
        setDataProvider(() => dataProvider);
      } catch (error) {
        console.error(error);
        setDataProvider(() => Promise.reject(error));
      }
    };
    fetchToken();
  }, []);
  
  if (!dataProvider) {
    return <div>Loading...</div>;
  }


  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="orders" list={OrderList} />
    </Admin>
  );
}

export default App;