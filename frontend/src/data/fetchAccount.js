export const FetchAccount = async () => {
    const token = localStorage.getItem('token');
        //console.log(token)
    let data = [];
    //useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/sapi/vendors/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Account details');
                }

                data = await response.json();
                //console.log(data);
            } catch (error) {
                console.error('Failed to fetch Account Details:', error);
            }
            //console.log(data)
            
        };

        await fetchData();
        //console.log(data)
        return data
    //}, []);
}

export default FetchAccount;
