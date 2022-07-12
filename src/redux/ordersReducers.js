import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "sass";

const value = {

  table: null,
  waiter: null,
  status: null,
  startOrderTime: null,
  endOrderTime: null,
  cost: null,
  dishes: [
    {
      dish: null,
      count: null,
      price: null,
      totalAmount: null,
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
        cost: 0
      }

      state.push(newOrder) 

    },

    addDish: (state, action) => {
      console.log(action.payload);
      let orderIndex = state.findIndex((item) => {
        return item.id === action.payload.id;
      });

      console.log("order index" + orderIndex);
      // console.log("qweee" + state.id);

      // state.dishes.push(action.payload)
     
    },
  },
});

export const { createNewOrder, addDish } = ordersSlice.actions;

export default ordersSlice.reducer;
