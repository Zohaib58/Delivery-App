const ProductReducer = (state, action) => {
    if(action.type === "SET_LOADING"){
        return{...state, isLoading : true}
    };

    if(action.type === "API_ERROR"){
        return{...state, isLoading : false, isError: true};
    };

    if(action.type === "MY_API_DATA"){
        return {...state, isLoading:false, isError: false, products: action.payload}
    };
};

export default ProductReducer;