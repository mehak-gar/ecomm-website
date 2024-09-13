
import { configureStore } from "@reduxjs/toolkit";
import products from '@/store/Products'
import carts from '@/store/cart'
import search from "@/store/search";
import categories from "@/store/category"


const store = configureStore({
  reducer: {
products:products,
carts:carts,
search:search,
categories:categories
  },
});
export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


