import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AllOrders = () => {
  const orders = useSelector((state) => state.ordersReducers);
  let total = 0;
  return (
    <div>
      {orders.length === 0 ? (
        <div>sifarishler yoxdur</div>
      ) : (
        orders.map((order, index) => {
          return (
            <div key={order.id}>
              {index + 1}
              {order.table}
              {order.waiter} ,{order.status},{order.cost}
              {order.status === "Sonlanib" ? (
                <span>{order.endOrderTime}</span>
              ) : (
                <span>--</span>
              )}
              {total = total + order.cost}
              <button>BAX</button>
            </div>
          );
        })
      )}
      {total === 0 ? <div></div> : <div>totalAmount {total}</div>}
      
    </div>
  );
};

export default AllOrders;
