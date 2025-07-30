export interface PregnancyData {
    id?: string;
    lastPeriodDate: string;
    dueDate: string;
    currentWeek: number;
    currentDay: number;
    babyName?: string;
    motherName?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface BabySize {
    item: string;
    emoji: string;
    size: string;
}

export interface WeeklyDevelopment {
    week: number;
    title: string;
    developments: string[];
    milestones: string[];
    motherChanges: string[];
}