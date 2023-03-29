import { api } from "../services";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
        serializeCheck: false,
});