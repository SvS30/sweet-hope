import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "../../types/AppData";

const initialState: UIState = {
    activeTab: 'dashboard',
    isLoading: false,
    notifications: [],
    theme: 'light',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
            const notification = {
                ...action.payload,
                id: Date.now().toString(),
                timestamp: Date.now(),
            };
            state.notifications.push(notification);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
    }
});

export const {
    setActiveTab,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    setTheme
} = uiSlice.actions;
export default uiSlice.reducer;