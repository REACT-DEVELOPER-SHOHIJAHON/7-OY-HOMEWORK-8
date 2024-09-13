import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

import { api } from "../api";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export { store };
