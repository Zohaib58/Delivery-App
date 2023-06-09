export const AddDataComponent = async (route, data) => {
    const addData = async () => {
    try {
      console.log("reached")
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const port = process.env.REACT_APP_BACKEND_PORT;
      const apiUrl = `${baseUrl}:${port}/${route}`;
      
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });
  
      console.log(response);
    } catch (error) {
      console.error('Failed to add data: ', error);
    }
}
    await addData();
};
export default AddDataComponent;