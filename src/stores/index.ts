import { configureStore } from "@reduxjs/toolkit";

import pregnancyReducer from './slices/pregnancySlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        pregnancy: pregnancyReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;