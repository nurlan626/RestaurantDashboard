import React from "react";
import { useSelector } from "react-redux";
import './MainPage.scss'

const MainPage = () => {
  const orders = useSelector((state) => state.ordersReducers)

  function dailyProfitFinish(){
    let profit = 0;
    orders.forEach((order) => {
      if(order.status === "Sonlanib"){
        profit += order.totalAmount
      }
    })
    return profit
  }

  function dailyProfitNotFinish(){
    let profit = 0;
    orders.forEach((order) => {
      if(order.status === "Sonlanmayib"){
        profit += order.totalAmount
      }
    })
    return profit
  }

  return <div className="mainPage">
    <div>
    Main page

    </div>
    <div>Sifarishlerin sayi - {orders.length}</div>
    <div>Sonlanan sifarişlərin cəmi gəliri - {dailyProfitFinish()} </div>
    <div>Sonlanmayan sifarişlərin cəmi - {dailyProfitNotFinish()} </div>

  </div>;
};

export default MainPage;
