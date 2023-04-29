import { createContext, useContext, useEffect, useReducer } from "react";
import {GetAllProducts} from '../util/ProductAPIs'
import reducer from "../Reducer/productReducer"



const ProductContext = createContext();

const initialState = {
    isLoading : false,
    isError: false,
    products: [],
};

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    dispatch({type:"SET_LOADING"});
    
    async function fetchProducts() {
        const res = await GetAllProducts()
        const products = res.data
        dispatch({type:"MY_API_DATA", payload:products});
    }

    useEffect( () => {
        try{
            fetchProducts()
        } catch(error){
            dispatch({type:"API_ERROR"});
        }
    },[]);

    console.log("ProductProvider state: ", state);

    return(
        <ProductContext.Provider value={{...state}}>
            {children}
        </ProductContext.Provider>
    );
};

const UseProductContext = () => {
    return useContext(ProductContext);
};

export { ProductProvider, ProductContext, UseProductContext };