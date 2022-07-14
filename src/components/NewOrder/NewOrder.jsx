import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrder } from "../../redux/ordersReducers";
import "./NewOrder.scss"

const NewOrder = () => {
  const [table, setTable] = useState("");
  const [waiter, setWaiter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const createOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Math.random(),
      table: table,
      waiter: waiter,
      orderTime: new Date().toUTCString(),
    };
    navigate('/menuDishes', {state: {id: newOrder.id}})
    dispatch(createNewOrder(newOrder));
  };

  return (
    <div class="newOrder">
      <form  class="newOrder-form">
        <select
          value={waiter}
          onChange={(e) => setWaiter((e = e.target.value))}
          
        >
          <option value="" selected disabled hidden>
            Waiter
          </option>
          <option value="Anar">Anar</option>
          <option value="Rustem">Rustem</option>
          <option value="Fuad">Fuad</option>
          <option value="Azer">Azer</option>
          <option value="Kamran">Kamran</option>
        </select>
        <select value={table} onChange={(e) => setTable((e = e.target.value))}>
          <option value="" selected disabled hidden>
            Table
          </option>

          <option value="m1">m1</option>
          <option value="m2">m2</option>
          <option value="m3">m3</option>
          <option value="m4">m4</option>
          <option value="m5">m5</option>
          <option value="k1">k1</option>
          <option value="k2">k2</option>
          <option value="k3">k3</option>
          <option value="k4">k4</option>
          <option value="k5">k5</option>
        </select>
        <button type="submit" onClick={(e) => createOrder(e)}>
          Yarat
        </button>
      </form>
    
    </div>
  );
};

export default NewOrder;
