// import { combineReducers, createStore } from "redux";
// import customerReducer from "./features/customers/CustomerSlice";
// import accountReducer from "./features/accounts/AccountSlice";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customers/CustomerSlice';
import accountReducer from './features/accounts/AccountSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  }
  // devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development
});

export default store;
