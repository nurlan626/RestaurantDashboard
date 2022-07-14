import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";

const MainPage = () => {
  const orders = useSelector((state) => state.ordersReducers);
  const navigate = useNavigate();

  function dailyProfitFinish() {
    let profit = 0;
    orders.forEach((order) => {
      if (order.status === "Sonlanib") {
        profit += order.totalAmount;
      }
    });
    return profit;
  }

  function dailyProfitNotFinish() {
    let profit = 0;
    orders.forEach((order) => {
      if (order.status === "Sonlanmayib") {
        profit += order.totalAmount;
      }
    });
    return profit;
  }

  return (
    <div className="mainPage">
      <div></div>
      <div>Sifarişlərin sayi - {orders.length}</div>
      <div>Sonlanan sifarişlərin cəmi gəliri - {dailyProfitFinish()} </div>
      <div>Sonlanmayan sifarişlərin cəmi - {dailyProfitNotFinish()} </div>
      <div>
        <button onClick={() => navigate("/allorders")}>Bütün sifarişlər</button>
        <button onClick={() => navigate("/neworders")}>
          Yəni sifariş yarat
        </button>
      </div>
    </div>
  );
};

export default MainPage;
