import type { AIContentRequest } from "../types/serviceData";

class SupabaseService {

    private supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    private supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    async generateAIContent(request: AIContentRequest): Promise<any> {
        if (!this.supabaseUrl || !this.supabaseAnonKey) {
            throw new Error(`Supabase not configured`);
        }

        const response = await fetch(`${this.supabaseUrl}/functions/v1/ai-content`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.supabaseAnonKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) throw new Error('AI Content generation failed');
        return response.json();
    }
}

export const supabaseService = new SupabaseService();