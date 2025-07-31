import type { CachedContent } from "../types/serviceData";

export class ContentCache {

    /**
     * Genera una clave única para el almacenamiento en caché.
     * @param type Tipo de contenido (ej: 'ai_content', 'daily_message').
     * @param identifier Identificador único para el contenido (ej: semana, día, etc).
     * @returns Clave única para localStorage.
     */
    private static getKey(type: string, identifier: string): string {
        return `pregnancy_${type}_${identifier}`;
    }

    /**
     * Recupera un dato del cache si no ha expirado.
     * @param type Tipo de contenido.
     * @param identifier Identificador único del contenido.
     * @param expirationHours Horas de expiración (por defecto 24).
     * @returns El dato cacheado o null si no existe o expiró.
     */
    static get(type: string, identifier: string, expirationHours = 24): any {
        try {
            const key = this.getKey(type, identifier);
            const cached = localStorage.getItem(key);
            if (cached) {
                const { data, timestamp }: CachedContent = JSON.parse(cached);
                const isExpired = Date.now() - timestamp > expirationHours * 60 * 60 * 1000;

                if (!isExpired) {
                    return data;
                }
                // Si expiró, se elimina del cache
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(`Error reading from cache: ${error}`);
            try {
                const key = this.getKey(type, identifier);
                localStorage.removeItem(key);
            } catch (cleanupError) {
                console.warn('Failed to cleanup corrupted cache entry:', cleanupError);
            }
        }
        return null;
    }


    /**
     * Guarda un dato en el cache con timestamp actual.
     * @param type Tipo de contenido.
     * @param identifier Identificador único del contenido.
     * @param data Dato a almacenar.
     */
    static set(type: string, identifier: string, data: any): void {
        try {
            const key = this.getKey(type, identifier);
            const cacheData: CachedContent = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Error writing to cache:', error);
        }
    }

    /**
     * Limpia el cache de un tipo específico o todo el cache relacionado con pregnancy.
     * @param type (Opcional) Tipo de contenido a limpiar. Si no se especifica, limpia todo el cache de pregnancy.
     */
    static clear(type?: string): void {
        try {
            if (type) {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(`pregnancy_${type}_`)) {
                        localStorage.removeItem(key);
                    }
                });
            } else {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith('pregnancy_')) {
                        localStorage.removeItem(key);
                    }
                });
            }
        } catch (error) {
            console.warn('Error clearing cache:', error);
        }
    }
}