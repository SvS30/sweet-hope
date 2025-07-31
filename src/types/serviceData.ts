export interface CachedContent {
    data: any;
    timestamp: number;
}

export interface AIContentRequest {
  type: 'daily_message' | 'development_info' | 'support_message';
  week: number;
  day?: number;
  mood?: string;
  babyName?: string;
  motherName?: string;
}

export interface AIContentResponse {
  content: string;
  isAI: boolean;
  cached?: boolean;
}