import { configureStore, createReducer } from '@reduxjs/toolkit';
import ordersReducers from './ordersReducers';


const store = configureStore({
    reducer: {
        ordersReducers: ordersReducers
     
    },
  });

  export default store