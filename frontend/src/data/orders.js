import FetchOrders from './fetchOrders';
const ordersPromise = FetchOrders();
let all_orders = [];
ordersPromise.then(orders => {
  // Handle the resolved value (orders)

  for (let i = 0; i < orders.data.length; i++) {
    let value = orders.data[i];
    all_orders[i] = {
        id: value._id,
        date: value.createdAt,
        email: "michael.lawson@reqres.in",
        first_name: value.customerId,
        product: "Phone Case Pink  x 2",
        price: value.cost,
        status: value.status
    }  
  }
  
}).catch(error => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});



export default all_orders;