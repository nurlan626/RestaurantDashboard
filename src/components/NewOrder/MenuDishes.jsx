import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import menuJSON from "../../data/menu.js";
import { addDish, cancelDish, closeOrder } from "../../redux/ordersReducers.js";
import "./MenuDishes.scss";

const MenuDishes = () => {
  const [dish, setDish] = useState();
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [menu, setMenu] = useState(menuJSON);
  const [finishOrder, setFinishOrder] = useState(false);
  const { state } = useLocation();

  const dispatch = useDispatch();
  let className = "";
  if (finishOrder) {
    className = "finishOrder";
  }

  let orders = useSelector((state) => state.ordersReducers);

  let orderID = orders.findIndex((item) => {
    return item.id === state.id;
  });

  let dishes = useSelector((state) => state.ordersReducers[orderID].dishes);

  let dishesBillAmount = 0;
  if (dishes.length !== 0) {
    dishesBillAmount = dishes.reduce(
      (sum, dish) => sum + dish.price * dish.count,
      0
    );
  }

  const addDishesHandler = (e) => {
    e.preventDefault();
    console.log(dish, count);
    if (dish === "" || count === null) {
      console.log("пусто");
    } else {
      let dishIndex = menu.findIndex((item) => {
        return item.name === dish;
      });
      dispatch(
        addDish({
          id: state.id,
          dish: dish,
          count: count,
          price: menu[dishIndex].price,
          orderTime: new Date(),
          status: "verildi",
        })
      );
      setDish("");
      setCount(null);
    }
  };

  function closeOrderHandler() {
    dispatch(closeOrder(state.id));
    setFinishOrder(true);
  }
  function cancelDishHandler(orderID, dishID) {
    dispatch(
      cancelDish({
        orderID: orderID,
        dishID: dishID,
      })
    );
  }

  return (
    <div className="menuDishes">
      <div>Aşaqdaçı listdən məhsul seçimi edin</div>
      <form className="menuDishes-form">
        <select
          defaultValue={""}
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        >
          <option value="" disabled hidden>
            Mehsul
          </option>
          {menu.map((dish) => {
            return (
              <option value={dish.name} key={Math.random()}>
                {dish.name} - {dish.price}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        ></input>

        <button type="submit" onClick={(e) => addDishesHandler(e)}>
          əlavə et
        </button>
      </form>
      <div></div>
      <table id="dishes" className="dishes">
        {dishes.length !== 0 ? (
          <tr>
            <th>Say</th>
            <th>Məhsul adı</th>
            <th>Miqdar</th>
            <th>Məbləğ</th>
            <th>Sifariş saatı</th>
            <th>Status</th>
            <th>Gəri</th>
          </tr>
        ) : (
          <div></div>
        )}

        {dishes.map((item, index) => {
          return (
            <tr key={Math.random()}>
              <td>{index + 1}</td>
              <td>{item.dish}</td>
              <td>{item.count}</td>
              <td>{item.price * item.count} AZN</td>
              <td>
                <div>
                  {item.orderTime.getHours()}:{item.orderTime.getMinutes()}:
                  {item.orderTime.getSeconds()}
                </div>
              </td>
              <td> {item.status} </td>

              <button onClick={() => cancelDishHandler(orderID, item.id)}>
                gəri al
              </button>
            </tr>
          );
        })}
      </table>
      <div>
        Cəmi məbləğ <span>{dishesBillAmount} AZN </span>
      </div>
      <div>
        <button
          onClick={() => {
            closeOrderHandler();
          }}
          className={className}
        >
          Sifarişi sonlandir
        </button>
        <button
          onClick={() => {
            navigate("/allorders");
          }}
        >
          Gəri
        </button>
      </div>
    </div>
  );
};

export default MenuDishes;
