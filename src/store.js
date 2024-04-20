import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./reducers/user"
import loaderReducer from "./reducers/loader"
import { api } from "./services/api";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
