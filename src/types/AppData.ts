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

export interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}