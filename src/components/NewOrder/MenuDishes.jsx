import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import menuJSON from "../../data/menu.js";
import { addDish, addTotalAmount, cancelDish, closeOrder } from "../../redux/ordersReducers.js";
import "./MenuDishes.scss"

const MenuDishes = () => {
  const [dish, setDish] = useState();

  const [count, setCount] = useState(0);
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

  // let dishes = orders[orderID].dishes;
  let dishes = useSelector((state) => state.ordersReducers[orderID].dishes);


  let dishesBillAmount = 0
  if (dishes.length !== 0) {
    dishesBillAmount = dishes.reduce((sum, dish) => sum + dish.price * dish.count , 0);
  }

  const addDishesHandler = (e) => {
    e.preventDefault();
    let dishIndex = menu.findIndex((item) => {
      return item.name === dish;
    });
    setDish("");
    setCount(0);
    dispatch(
      addDish({
        id: state.id,
        dish: dish,
        count: count,
        price: menu[dishIndex].price,
        orderTime: new Date().toDateString(),
        status: "verildi",
      })
    );
  };

  function closeOrderHandler() {
    dispatch(closeOrder(state.id))
    setFinishOrder(true);
    
  }
  function cancelDishHandler(orderID, dishID){
    dispatch(cancelDish({
      orderID: orderID,
      dishID: dishID
    }));
  }


  return (
    <div className="menuDishes">
      <div>Ashqdachi Listden mehsul sechimi edin</div>
      <form  className="menuDishes-form">
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
        {dishes.map((item, index) => {
          return (
            <div key={Math.random()} className="dish-box">
              <div >
              <span>{index + 1}</span>-<span>{item.dish}</span>-
              <span>{item.count}</span>-
              <span>{item.price * item.count} AZN</span>
              <span>time {item.orderTime} </span>
              <span>time {item.status} </span>
              </div>
         
              <button onClick={() => cancelDishHandler(orderID, item.id)} >geri al</button>
            </div>
          );
        })}
        
        
      </div>
      <div>
          cemi mebleg <span>{dishesBillAmount} </span>
        </div>
      <button onClick={() => closeOrderHandler() } className={className} >Sifarishi sonlandirin</button>
    </div>
  );
};

export default MenuDishes;
