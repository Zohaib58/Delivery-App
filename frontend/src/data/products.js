import FetchProducts from './fetchProducts';
const ordersPromise = FetchProducts();
let all_orders = []
//console.log(ordersPromise);
ordersPromise.then(orders => {
  // Handle the resolved value (orders)
    console.log(orders)
  for (let i = 0; i < orders.length; i++) {
    let value = orders[i];
    all_orders[i] = {
        id: value._id,
        date: value.createdAt,
        //email: "michael.lawson@reqres.in",
        first_name: value.name,
        product: value.image,
        price: value.cost,
        status: value.status
    }  
  }
  
}).catch(error => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});



export default all_orders;