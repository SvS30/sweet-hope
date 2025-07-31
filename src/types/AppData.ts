import type { PregnancyData } from "./pregnancyData";

export interface AppState {
    pregnancyData: PregnancyData | null;
    isLoading: boolean;
    error: string | null;
    activeTab: string | null;
    isSetupComplete: boolean;
}

export interface UIState {
    activeTab: string;
    isLoading: boolean;
    notifications: Array<{
        id: string;
        message: string;
        type: 'success' | 'error' | 'info';
        timestamp: number;
    }>;
    theme: 'light' | 'dark';
}