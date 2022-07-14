import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import menuJSON from "../../data/menu.js";
import { addDish } from "../../redux/ordersReducers.js";

const MenuDishes = () => {
  const [dish, setDish] = useState();

  const [count, setCount] = useState(0);
  const [dishList, setDishList] = useState([]);
  const [dishesValue, setDishesValue] = useState(0);
  const [menu, setMenu] = useState(menuJSON);
  const {state} = useLocation();
  const dispatch = useDispatch();

  const addDishesHandler = (e) => {
    e.preventDefault();

    let dishIndex = menu.findIndex((item) => {
      return item.name === dish;
    });

    const newDishlist = [
      ...dishList,
      {
        dish: dish,
        count: count,
        price: menu[dishIndex].price,
        orderTime: new Date().toDateString(),
        status: "verildi",
      },
    ];

    setDishList(newDishlist);
    setDish("");
    setCount(0);

    let sum = dishList.reduce((a, dish) => a + dish.price * dish.count, 0);
    setDishesValue(() => sum);

    dispatch(addDish(state));
    
  };
  

  return (
    <div>
      <div>Ashqdachi Listden mehsul sechimi edin</div>
      <form>
        <label>Mehsul adi </label>
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
          elave et
        </button>
      </form>
      <div></div>
      <div>
        {dishList.map((item, index) => {
          return (
            <div key={Math.random()}>
              <span>{index + 1}</span>-<span>{item.dish}</span>-
              <span>{item.count}</span>-
              <span>{item.price * item.count} AZN</span>
              <span>time {item.orderTime} </span>
              <span>time {item.status} </span>
            </div>
          );
        })}
        <div>
          cemi mebleg <span>{dishesValue} </span>
        </div>
      </div>
    </div>
  );
};

export default MenuDishes;
