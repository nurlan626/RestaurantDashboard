import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AllOrders.scss"

const AllOrders = () => {
  const orders = useSelector((state) => state.ordersReducers);
  let total = 0;
  const navigate = useNavigate();

  function addDishesHandler(id) {
    navigate('/menuDishes', {state: {id: id}})

  }
  function dailyProfit(){
    let profit = 0;
    orders.forEach((order) => {
       profit += order.totalAmount
    })
    return profit
  }
  return (
    <div className="AllOrders">
      
      {orders.length === 0 ? (
        <div>sifarishler yoxdur</div>
      ) : (
        

        orders.map((order, index) => {
          return (  
            <div key={order.id} className="order">
              <div>{index + 1}</div>
              <div>{order.table}</div>
              <div>{order.waiter} </div>
              <div className={order.status === "Sonlanib" ? "sonlanib" : "sonlanmayib"}>{order.status}</div>
              <div>{order.totalAmount} AZN</div>
              <div>{order.status === "Sonlanib" ? (
                <span>{order.endOrderTime}</span>
              ) : (
                <span>--</span>
              )}</div>
              <button onClick={() => addDishesHandler(order.id)}>BAX</button>
            </div>
          );
        })
      )}
       Cemi mebleg -  {dailyProfit()} AZN

      
    </div>
  );
};

export default AllOrders;
