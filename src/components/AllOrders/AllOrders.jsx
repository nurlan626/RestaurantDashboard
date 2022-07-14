import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AllOrders.scss";

const AllOrders = () => {
  const orders = useSelector((state) => state.ordersReducers);
  let total = 0;
  const navigate = useNavigate();

  function addDishesHandler(id) {
    navigate("/menuDishes", { state: { id: id } });
  }
  function dailyProfit() {
    let profit = 0;
    orders.forEach((order) => {
      profit += order.totalAmount;
    });
    return profit;
  }
  return (
    <div className="AllOrders">
      <h1>Bütun sifarişlər</h1>
      <table id="dishes" className="dishes">
        {orders.length !== 0 ? (
          <tr>
            <th>Say</th>
            <th>Masa</th>
            <th>Ofisiant </th>
            <th>Status</th>
            <th>Məbləğ</th>
            <th>Tarix</th>
            <th>Gəri</th>
          </tr>
        ) : (
          <h3 className="h3">Sifarişlər yoxdur</h3>
        )}

        {orders.map((order, index) => {
          return (
            <tr key={order.id} className="orders">
              <td>{index + 1}</td>
              <td>{order.table}</td>
              <td>{order.waiter} </td>
              <td
                className={
                  order.status === "Sonlanib" ? "sonlanib" : "sonlanmayib"
                }
              >
                {order.status}
              </td>
              <td>{order.totalAmount} AZN</td>
              <td>
                {order.status === "Sonlanib" ? (
                  <span>{order.endOrderTime}</span>
                ) : (
                  <span>--</span>
                )}
              </td>
              <td>
                <button onClick={() => addDishesHandler(order.id)}>BAX</button>
              </td>
            </tr>
          );
        })}
      </table>

      <button onClick={() => navigate("/neworders")}>Yəni sifariş yarat</button>
      {orders.length !== 0 ? (
        <div>Cəmi məbləğ - {dailyProfit()} AZN</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AllOrders;
