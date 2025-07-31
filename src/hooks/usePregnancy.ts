import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector";
import { initializePregnancyData, resetPregnancyData, savePregnancyData, updatePregnancyProgress } from "../stores/slices/pregnancySlice";
import type { PregnancyData } from "../types/pregnancyData";

export const usePregnancy = () => {

    const dispatch = useAppDispatch();
    const { pregnancyData, isLoading, error, isSetupComplete } = useAppSelector(
        (state) => state.pregnancy
    );

    useEffect(() => {
        dispatch(initializePregnancyData());
    }, [dispatch]);

    // Auto-update progress daily
    useEffect(() => {
        if (pregnancyData) {
            const lastUpdate = pregnancyData.updatedAt ? new Date(pregnancyData.updatedAt) : null;
            const today = new Date();

            if (!lastUpdate || lastUpdate.toDateString() !== today.toDateString()) {
                dispatch(updatePregnancyProgress(pregnancyData));
            }
        }
    }, [pregnancyData, dispatch]);

    const saveData = (data: PregnancyData) => {
        dispatch(savePregnancyData(data));
    };

    const resetData = () => {
        dispatch(resetPregnancyData());
    };

    const calculatePregnancyData = (lastPeriod: string, babyName?: string, motherName?: string): PregnancyData => {
        const lpDate = new Date(lastPeriod);
        const today = new Date();
        const diffTime = today.getTime() - lpDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const currentWeek = Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), 42);
        const currentDay = Math.min(Math.max((diffDays % 7) + 1, 1), 7);

        const dueDate = new Date(lpDate);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks

        return {
            lastPeriodDate: lastPeriod,
            dueDate: dueDate.toISOString().split('T')[0],
            currentWeek,
            currentDay,
            babyName,
            motherName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    };

    return {
        pregnancyData,
        isLoading,
        error,
        isSetupComplete,
        saveData,
        resetData,
        calculatePregnancyData
    }
}