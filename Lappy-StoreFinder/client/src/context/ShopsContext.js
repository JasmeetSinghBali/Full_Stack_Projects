import React, {useState, createContext} from 'react';

export const ShopsContext = createContext();

export const ShopsContextProvider = (props) =>{

    const [shops,setShops] = useState([]);

    return(
        <ShopsContext.Provider 
            value={{
                shops,
                setShops
            }}
        >
            {props.children}
        </ShopsContext.Provider>
    );
};