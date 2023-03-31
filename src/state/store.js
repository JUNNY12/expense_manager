import { api } from "../services";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice";

export const store = configureStore({
    reducer: {
        expense: expenseReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
        serializeCheck: false,
});