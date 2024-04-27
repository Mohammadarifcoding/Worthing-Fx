

import UseCurrency from "../../../Hook/UseCurrency";
import CurrencyChart from "../../Shared/CurrencyChart/CurrencyChart";
import Accordin from "./Accordin/Accordin";
import Banner from "./Banner/Banner";
import Commitment from "./Commitment/Commitment";
import CompareCurrencies from "./CompareCurrencies/CompareCurrencies";
import Download from "./Download/Download";
import Features from "./Features/Features";
import StoreFind from "./StoreFind/StoreFind";
import axios from "axios"


const Home = () => {
    const [currency,refetchCurrency] = UseCurrency()
    const getData =()=>{
        axios
        .get(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=GBP&amount=1`, {
            headers: {
                apikey: 'axzEXuSlK04KLpdbkJNJlzIuwXJRmopv'
            }
        }).then((res) => {
           console.log(res.data?.info?.rate)
        })
    }

    return (
        <div>
            <Banner></Banner>
            <Commitment></Commitment>
            <CurrencyChart currency={currency}></CurrencyChart>
            {/* <Features></Features> */}
            <StoreFind></StoreFind>
            <CompareCurrencies></CompareCurrencies> 
            <Accordin></Accordin>          
            <Download></Download>
            <button className='bg-black text-white px-5 py-3 ' onClick={getData}>hello </button>
        </div>
    );
};

export default Home;