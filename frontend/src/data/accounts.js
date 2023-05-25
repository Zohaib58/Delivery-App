import FetchAccount from './fetchAccount';

async function Orders() {
  let fetchPromise = await FetchAccount();
  let account = null;

  async function fetchData() {
        account = fetchPromise
        
    }

    await fetchData();
    return account
}
export default Orders;
