import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/Coincontext';
import Linechart from '../../components/Chart/Linechart';
import "./Coin.css"

const Coin = () => {
    const {coinId} = useParams();
    const [coinData,setCoinData] = useState();
    const [historicalData,setHistoricalData] = useState();
    const {currency} = useContext(CoinContext)
    const fetchCoinData = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-4sEssUBZxxMegYBBn24sFFJX'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    }
    const fetcHistoricalData = async ()=>{
      const options = {
         method: 'GET',
         headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-4sEssUBZxxMegYBBn24sFFJX'}
       };
       
       fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily` ,options)
         .then(response => response.json())
         .then(response => setHistoricalData(response))
         .catch(err => console.error(err));
    }
    useEffect(()=>{
       fetchCoinData();
       fetcHistoricalData();
    },[currency])
    if(coinData && historicalData) {
        return (
            <div className='coin'> 
               <div className='coin-name'>
                <img src={coinData.image.large} alt="" />
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
               </div>
               <div className='coin-chart'>
                    <Linechart historicalData={historicalData}/>
               </div>
               <div className='coin-info'>
                  <ul>
                     <li>Crypto Market Rank</li>
                     <li>{coinData.market_cap_rank}</li>
                     
                  </ul>
                  <ul>
                     <li>Current Price</li>
                     <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                     
                  </ul>
                  <ul>
                     <li>Market cap</li>
                     <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                     
                  </ul>
                  <ul>
                     <li>24 Hour high</li>
                     <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                     
                  </ul>
                  <ul>
                     <li>24 Hour Low</li>
                     <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                     
                  </ul>
               </div>
            </div>
          )
    }
 else{
    return (
        <div className='spinner'> 
           <div className='spin'></div>
        </div>
      )
 }
}

export default Coin
