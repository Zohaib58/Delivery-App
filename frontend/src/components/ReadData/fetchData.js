export async function FetchDataComponent (route){

    let data = null
    const FetchData = async () => {
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const port = process.env.REACT_APP_BACKEND_PORT;
            const apiUrl = `${baseUrl}:${port}/${route}`;
            
            const token = localStorage.getItem('token');
            //console.log(token)
            
            //console.log(apiUrl)
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            data = await response.json();
    
        } catch (error) {
            console.error('Failed to fetch data: ', error);
            return null;
        }
    };
    
    await FetchData();
    return data;
}


export default FetchDataComponent;
