export const UpdateDataComponent = async (route, data) => {
    const updateData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const port = process.env.REACT_APP_BACKEND_PORT;
      const apiUrl = `${baseUrl}:${port}/${route}`;
      
      const token = localStorage.getItem('token');
      //console.log(data)
      console.log(apiUrl)
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      console.log(response.data);
    } catch (error) {
      console.error('Failed to update data: ', error);
    }
    }
    await updateData();
};
  
export default UpdateDataComponent;