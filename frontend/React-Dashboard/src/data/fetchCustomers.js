// customer.js

const getAllCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customer/all');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const customers = await response.json()
      //console.log(customers)
      return customers;
      
    } catch (error) {
      console.error(error);
      return [];
    }
  };
 
  export default getAllCustomers;