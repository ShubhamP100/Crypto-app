// This file is made to fetch the api for the coinchange
//  It shows how to fetch the api from data and diplay it

import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider =(props)=>{
     
    const [allCoin,setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name:"usd",
        symbol:"$"
    });
    const [error, setError] = useState(null); // State to handle errors
    const [loading, setLoading] = useState(false); // State to handle loading


    const fetchAllCoin = async ()=>{
        setLoading(true);
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-4sEssUBZxxMegYBBn24sFFJX',
            },
          };

       try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          options
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAllCoin(data); // Set allCoin to fetched data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError(err.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
       useEffect(()=>{
        fetchAllCoin();
      },[currency])
         
       const contextValue ={
          allCoin,currency,setCurrency,error,loading,
    }
      
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};
export default CoinContextProvider;