import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface AIContentRequest {
    type: 'daily_message' | 'development_info' | 'support_message';
    week: number;
    day?: number;
    mood?: string;
    babyName?: string;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { type, week, day, mood, babyName }: AIContentRequest = await req.json()

        // Construir el prompt según el tipo de contenido
        let prompt = ''

        switch (type) {
            case 'daily_message':
                prompt = `Genera un mensaje motivacional y cálido para una mujer embarazada en la semana ${week} de gestación. 
        ${babyName ? `Su bebé se llama ${babyName}.` : ''} 
        El mensaje debe ser empático, positivo y específico para esta etapa del embarazo. 
        Máximo 150 caracteres. En español.`
                break;

            case 'development_info':
                prompt = `Describe brevemente el desarrollo fetal en la semana ${week} de embarazo. 
        Incluye 2-3 puntos específicos sobre qué está desarrollándose en esta semana. 
        Usa un tono científico pero accesible. En español. Máximo 200 caracteres.`
                break;

            case 'support_message':
                prompt = `Genera un mensaje de apoyo empático para una mujer embarazada que se siente ${mood || 'normal'} 
        en la semana ${week} de gestación. El mensaje debe validar sus emociones y ofrecer consuelo. 
        Máximo 180 caracteres. En español.`
                break;
        }

        // Llamar a Hugging Face API
        const hfResponse = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_length: 150,
                        temperature: 0.7,
                        do_sample: true,
                    }
                }),
            }
        )

        if (!hfResponse.ok) {
            throw new Error('Hugging Face API error')
        }

        const hfData = await hfResponse.json()

        // Extraer el contenido generado
        let generatedContent = ''
        if (hfData && hfData[0] && hfData[0].generated_text) {
            generatedContent = hfData[0].generated_text.replace(prompt, '').trim()
        }

        // Fallback si la respuesta está vacía o es muy corta
        if (!generatedContent || generatedContent.length < 20) {
            const fallbacks = {
                daily_message: `¡Felicidades por llegar a la semana ${week}! Tu bebé está creciendo hermosamente y tú estás haciendo un trabajo increíble. 💝`,
                development_info: `En la semana ${week}, tu bebé continúa desarrollándose activamente. Sus órganos maduran y se prepara para la vida fuera del útero.`,
                support_message: `Es completamente normal sentirse ${mood || 'así'} durante el embarazo. Confía en ti misma y en este hermoso proceso. 🌸`
            }
            generatedContent = fallbacks[type]
        }

        return new Response(
            JSON.stringify({ content: generatedContent }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            },
        )

    } catch (error) {
        console.error('Error:', error)

        return new Response(
            JSON.stringify({
                error: 'Error generating content',
                content: 'Tu embarazo es un viaje hermoso y único. Cada día es especial en este proceso de crear vida. 💝'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            },
        )
    }
})