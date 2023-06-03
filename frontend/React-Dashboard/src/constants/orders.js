import fetchCustomers1 from '../data/fetchCustomers';

let fetchC = fetchCustomers1();
const array = [];
let extractedArray; 


const all_orders = [
]

fetchC.then((array) => {

    for (var i = 0; i < array.length; i++) {
        all_orders[i] = array[i];
        
    }
    // Extracted array
    //console.log(array);
  
    // Store the array in a variable
    extractedArray = array;
    
    // Continue with further processing of the extracted array

  }).catch((error) => {
    // Handle any errors that occurred during the promise resolution
    console.error(error);
  });

//console.log(all_orders);

export default all_orders;