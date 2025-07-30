import { Cloud, Heart, Moon, Rainbow, Sun } from "lucide-react";

const supportMessages = {
    'daily_message': 'Cada día que pasa, tu cuerpo hace algo increíble: crear vida. Recuerda descansar, alimentarte bien y disfrutar cada momento de esta hermosa etapa. ¡Eres increíble! 💝',
};

const moodMessages = {
    happy: {
        icon: Sun,
        color: 'text-yellow-500',
        bg: 'from-yellow-100 to-orange-100',
        messages: [
            "¡Qué hermoso que te sientas feliz! Tu energía positiva también la siente tu bebé. 😊",
            "La felicidad libera endorfinas que benefician tanto a ti como a tu pequeño. ¡Disfruta este momento!",
            "Tu alegría es contagiosa. Sigue sonriendo y crea memorias hermosas de este tiempo especial."
        ]
    },
    tired: {
        icon: Moon,
        color: 'text-indigo-500',
        bg: 'from-indigo-100 to-purple-100',
        messages: [
            "Es completamente normal sentirse cansada. Tu cuerpo está haciendo un trabajo increíble creando vida. 💤",
            "Descansa cuando puedas. Cada hora de sueño es una inversión en tu bienestar y el de tu bebé.",
            "El cansancio del embarazo es real. Sé gentil contigo misma y toma descansos cuando lo necesites."
        ]
    },
    anxious: {
        icon: Cloud,
        color: 'text-gray-500',
        bg: 'from-gray-100 to-blue-100',
        messages: [
            "La ansiedad es común durante el embarazo. Respira profundo y recuerda que estás haciendo todo lo mejor que puedes. 🌸",
            "Cada preocupación que sientes es una muestra de cuánto amas a tu bebé. Habla con tu médico si la ansiedad persiste.",
            "Es normal tener miedos y dudas. Rodeate de apoyo y recuerda que millones de mujeres han pasado por esto exitosamente."
        ]
    },
    excited: {
        icon: Rainbow,
        color: 'text-pink-500',
        bg: 'from-pink-100 to-purple-100',
        messages: [
            "¡Tu emoción es contagiosa! Esta energía positiva crea un ambiente hermoso para tu bebé. 🌈",
            "La expectativa y la ilusión que sientes son parte de la magia del embarazo. ¡Disfruta cada momento!",
            "Tu entusiasmo por conocer a tu bebé es hermoso. Cada día estás más cerca de ese encuentro especial."
        ]
    },
    emotional: {
        icon: Heart,
        color: 'text-red-500',
        bg: 'from-red-100 to-pink-100',
        messages: [
            "Los cambios emocionales son parte normal del embarazo. Las hormonas están haciendo su trabajo. 💝",
            "Llora si lo necesitas, ríe cuando puedas. Todas las emociones son válidas durante este tiempo especial.",
            "Tus emociones intensas son una muestra de la conexión profunda que ya tienes con tu bebé."
        ]
    }
};

const weeklySupport = {
    early: { // 1-12 weeks
        title: "Primer trimestre: Los cimientos",
        messages: [
            "Tu cuerpo está estableciendo las bases para el crecimiento de tu bebé. Es normal sentir cambios intensos.",
            "Las náuseas y el cansancio son señales de que las hormonas están trabajando. Esto también pasará.",
            "Cada síntoma es una confirmación de que tu embarazo está progresando. Confía en tu cuerpo."
        ]
    },
    middle: { // 13-28 weeks
        title: "Segundo trimestre: La luna de miel",
        messages: [
            "¡Bienvenida al trimestre dorado! Muchas mujeres se sienten con más energía en esta etapa.",
            "Es probable que pronto sientas los primeros movimientos de tu bebé. ¡Qué momento tan especial!",
            "Tu barriga está creciendo y tu bebé se está desarrollando rápidamente. Disfruta estos cambios."
        ]
    },
    late: { // 29+ weeks
        title: "Tercer trimestre: La recta final",
        messages: [
            "Estás en la recta final. Tu cuerpo se está preparando para el gran día. Eres más fuerte de lo que crees.",
            "Es normal sentir incomodidad física. Cada molestia te acerca más al momento de conocer a tu bebé.",
            "Tu bebé está creciendo y preparándose para nacer. Pronto tendrás a tu pequeño en brazos."
        ]
    }
};

export { supportMessages, moodMessages, weeklySupport };