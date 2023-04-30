import { fetchUtils, Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import orderList from "./components/OrderList";

const apiUrl = "http://localhost:5000/vapi";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUxIiwiaWF0IjoxNjgyODUxMjI1LCJleHAiOjE2ODU0NDMyMjV9.gA0k0X0OdQBlOHwoiNWKIz7r5cnTiyXkUDH54oCjCjA";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set("Authorization", `Bearer ${token}`);
  // Set Access-Control-Expose-Headers and Content-Range headers for CORS
  options.headers['X-Total-Count'] = '30'
  options.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = restProvider(apiUrl, httpClient);
console.log(dataProvider)
//console.log(orderList);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="orders"  list  = {orderList}/>
  </Admin>
);

export default App;
