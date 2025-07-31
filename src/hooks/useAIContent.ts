import { useCallback, useState } from "react"
import type { AIContentRequest, AIContentResponse } from "../types/serviceData";
import { ContentCache } from "../utils/contentCache";
import { supabaseService } from "../services/supabaseService";

export const useAIContent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Permite solicitar mensajes generados por IA, cachearlos y manejar estados de carga y error.
     * @returns {AIContentResponse} generateContent (función para obtener contenido), isLoading (bool), error (string|null)
     */
    const generateContent = useCallback(async (request: AIContentRequest): Promise<AIContentResponse> => {
        const cacheKey = `${request.type}_${request.week}_${request.mood || 'default'}_${new Date().toDateString()}`;
        const cached = ContentCache.get('ai_content', cacheKey, 24);
        if (cached) {
            return { content: cached, isAI: true, cached: true };
        }
        setIsLoading(true);
        setError(null);

        try {
            const response = await supabaseService.generateAIContent(request);
            ContentCache.set('ai_content', cacheKey, response.content);
            return { content: response.content, isAI: true, cached: false };
        } catch (err) {
            console.warn(`AI content generation failed, using fallback:`, err);
            setError('AI service unavailable');

            const fallbackContent = getFallbackContent(request);
            return { content: fallbackContent, isAI: false, cached: false };
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Devuelve un mensaje de respaldo en caso de que la IA no esté disponible.
     * @param {AIContentRequest} request - Parámetros para determinar el tipo de mensaje.
     * @returns {string} Mensaje de respaldo aleatorio.
     */
    const getFallbackContent = (request: AIContentRequest): string => {
        const fallbacks = {
            daily_message: [
                "Cada día que pasa, tu cuerpo hace algo increíble: crear vida. Recuerda descansar, alimentarte bien y disfrutar cada momento de esta hermosa etapa. ¡Eres increíble! 💝",
                "Tu bebé está creciendo y desarrollándose perfectamente. Confía en tu cuerpo y en este proceso natural tan hermoso. ¡Estás haciendo un trabajo maravilloso! 🌟",
                "Hoy es un día especial en tu embarazo. Cada momento cuenta en este viaje único. Disfruta y celebra los pequeños cambios que sientes. 🌸"
            ],
            development_info: [
                "Tu bebé está en una etapa fascinante de desarrollo. Cada día trae nuevos cambios y crecimiento.",
                "En esta semana, tu pequeño está desarrollando características importantes que lo preparan para la vida fuera del útero.",
                "Los órganos y sistemas de tu bebé continúan madurando y perfeccionándose semana a semana."
            ],
            support_message: [
                "Recuerda que cada embarazo es único y especial. Confía en tu instinto maternal y en la sabiduría de tu cuerpo.",
                "Estás haciendo un trabajo increíble. Cada día que cuidas de ti misma, también cuidas de tu bebé.",
                "Es normal tener altibajos emocionales. Permítete sentir y busca apoyo cuando lo necesites."
            ]
        };

        const messages = fallbacks[request.type] || fallbacks.daily_message;
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return {
        generateContent,
        isLoading,
        error,
    };
}