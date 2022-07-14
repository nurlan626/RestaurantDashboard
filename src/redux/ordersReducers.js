import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "sass";

const value = {

  table: null,
  waiter: null,
  status: null,
  startOrderTime: null,
  endOrderTime: null,
  cost: null,
  totalAmount: null,
  dishes: [
    {
      dish: null,
      count: null,
      price: null,
      
      orderTime: null,
      timeOfWaiting: null,
      dishStatus: null,

      
    }
  ]
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    createNewOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        status: "Sonlanmayib",
        totalAmount: 0,
        dishes: []
      }

      state.unshift(newOrder) 

    },

    addDish: (state, action) => {
      let orderIndex = state.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state[orderIndex].dishes.unshift(action.payload);
      state[orderIndex].totalAmount = state[orderIndex].totalAmount + action.payload.count * action.payload.price;

    },
    closeOrder: (state, action) => {
      let orderIndex = state.findIndex((item) => {
        return item.id === action.payload;
      });
      
      state[orderIndex].status = "Sonlanib"
      console.log(state[orderIndex].status);
    },
    cancelDish: (state, action) => {
      // console.log(action.payload.dishID);
      let dishIndex = state[action.payload.orderID].dishes.findIndex((item) => {
        return item.id === action.payload.dishID;
      });
      state[action.payload.orderID].dishes[dishIndex].dishStatus = "imtina";

      console.log(state[action.payload.orderID].dishes[dishIndex].dishStatus);
      console.log(state[action.payload.orderID].dishes[dishIndex] );
      console.log(state[action.payload.orderID].dishes[dishIndex].dish);
    }

    
  },
});

export const { createNewOrder, addDish, closeOrder, cancelDish } = ordersSlice.actions;

export default ordersSlice.reducer;
