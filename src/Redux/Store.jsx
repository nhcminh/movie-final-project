import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootReducer from "./RootReducer";
const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
