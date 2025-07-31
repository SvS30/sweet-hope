import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PregnancyData } from "../../types/pregnancyData";
import type { AppState } from "../../types/AppData";

const initialState: AppState = {
    pregnancyData: null,
    isLoading: false,
    error: null,
    activeTab: null,
    isSetupComplete: false
}

export const initializePregnancyData = createAsyncThunk('pregnancy/initialize', async () => {
    const savedData = localStorage.getItem('pregnancyData');
    if (savedData) {
        return JSON.parse(savedData) as PregnancyData;
    }
    return null;
});

export const savePregnancyData = createAsyncThunk('pregnancy/save', async (data: PregnancyData) => {
    localStorage.setItem('pregnancyData', JSON.stringify(data));
    return data;
});

export const updatePregnancyProgress = createAsyncThunk(
    'pregnancy/updateProgress',
    async (pregnancyData: PregnancyData) => {
        const today = new Date();
        const lpDate = new Date(pregnancyData.lastPeriodDate);
        const diffTime = today.getTime() - lpDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const currentWeek = Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), 42);
        const currentDay = Math.min(Math.max((diffDays % 7) + 1, 1), 7);

        const updatedData = {
            ...pregnancyData,
            currentWeek,
            currentDay,
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem('pregnancyData', JSON.stringify(updatedData));
        return updatedData;
    }
);

const pregnancySlice = createSlice({
    name: 'pregnancy',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetPregnancyData: (state) => {
            state.pregnancyData = null;
            state.isSetupComplete = false;
            localStorage.removeItem('pregnancyData');
        },
    },
    extraReducers: (builder) => {
        builder
            // Initialize
            .addCase(initializePregnancyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initializePregnancyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pregnancyData = action.payload;
                state.isSetupComplete = !!action.payload;
            })
            .addCase(initializePregnancyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error initializing data';
            })
            // Save
            .addCase(savePregnancyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(savePregnancyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pregnancyData = action.payload;
                state.isSetupComplete = true;
            })
            .addCase(savePregnancyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error saving data';
            })
            // Update progress
            .addCase(updatePregnancyProgress.fulfilled, (state, action) => {
                state.pregnancyData = action.payload;
            });
    },
});

export const { setError, clearError, resetPregnancyData } = pregnancySlice.actions;
export default pregnancySlice.reducer;