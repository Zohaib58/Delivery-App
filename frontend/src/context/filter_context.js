import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({children}) => {
    const [state, setState] = useState('');

    return (
        <FilterContext.Provider value={{ ... state }}>
            {children}
        </FilterContext.Provider>
    );
};


export const useFilterContext = () => {
    return useContext(FilterContext);
}