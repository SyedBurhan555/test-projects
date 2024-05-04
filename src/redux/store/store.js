import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  allProducts  from '../slices/productSlice';


const rootReducer = combineReducers({
 allProducts:allProducts
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware,
  // middleware: getDefalutMiddleware =>
  //   getDefalutMiddleware({
  //     serializableCheck: false,
  //   }).concat(logger),
});