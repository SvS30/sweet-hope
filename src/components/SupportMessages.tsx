import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

import { moodMessages, weeklySupport } from "../constants/messagesData";
import type { PregnancyData } from "../types/pregnancyData"
import { useAIContent } from "../hooks";

interface Props {
    pregnancyData: PregnancyData
}
type MoodType = 'happy' | 'tired' | 'anxious' | 'excited' | 'emotional';

const SupportMessages: React.FC<Props> = ({ pregnancyData }) => {

    const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
    const { generateContent, isLoading: isLoadingAI } = useAIContent();
    const [aiSupportMessage, setAiSupportMessage] = useState<string>('');

    useEffect(() => {
        const loadAISupportMessage = async () => {
            if (selectedMood) {
                try {
                    const response = await generateContent({
                        type: 'support_message',
                        week: pregnancyData.currentWeek,
                        mood: selectedMood,
                        babyName: pregnancyData.babyName
                    });
                    setAiSupportMessage(response.content);
                } catch (error) {
                    console.error('Error loading AI support message:', error);
                    // Usar mensaje estático como fallback
                    const fallbackMessage = moodMessages[selectedMood].messages[0];
                    setAiSupportMessage(fallbackMessage);
                }
            }
        };

        loadAISupportMessage();
    }, [selectedMood, pregnancyData.currentWeek, pregnancyData.babyName, generateContent]);

    const getWeeklyPhase = () => {
        if (pregnancyData.currentWeek <= 12) return 'early';
        if (pregnancyData.currentWeek <= 28) return 'middle';
        return 'late';
    };
    const weeklyPhase = getWeeklyPhase();
    const phaseData = weeklySupport[weeklyPhase];

    const getRandomMessage = (messages: string[]) => {
        return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
        <div className="space-y-6">
            {/* Selector de estado de ánimo */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    ¿Cómo te sientes hoy?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(moodMessages).map(([mood, data]) => {
                        const Icon = data.icon;
                        return (
                            <button
                                key={mood}
                                onClick={() => setSelectedMood(mood as MoodType)}
                                className={`p-3 rounded-xl border-2 transition-all text-center ${selectedMood === mood
                                        ? 'border-pink-300 bg-pink-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 mx-auto mb-1 ${data.color}`} />
                                <span className="text-sm capitalize font-medium text-gray-700">
                                    {mood === 'happy' ? 'Feliz' :
                                        mood === 'tired' ? 'Cansada' :
                                            mood === 'anxious' ? 'Ansiosa' :
                                                mood === 'excited' ? 'Emocionada' : 'Emotiva'}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Mensaje personalizado según el estado de ánimo */}
            {selectedMood && (
                <div className={`bg-gradient-to-r ${moodMessages[selectedMood].bg} p-6 rounded-2xl border border-gray-200`}>
                    <div className="flex items-start">
                        <MessageCircle className="w-6 h-6 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Mensaje personalizado {isLoadingAI && '✨'}
                            </h3>
                            {isLoadingAI ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <span className="text-gray-500 text-sm">Generando mensaje personalizado...</span>
                                </div>
                            ) : (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {aiSupportMessage || getRandomMessage(moodMessages[selectedMood].messages)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Apoyo semanal */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-indigo-500" />
                    {phaseData.title}
                </h3>
                <div className="space-y-3">
                    {phaseData.messages.map((message, index) => (
                        <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recursos adicionales */}
            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-2xl border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-4">Recursos que pueden ayudarte</h3>
                <div className="space-y-2 text-sm">
                    <p className="text-gray-700">• Técnicas de respiración y relajación</p>
                    <p className="text-gray-700">• Ejercicios seguros para embarazadas</p>
                    <p className="text-gray-700">• Grupos de apoyo para futuras mamás</p>
                    <p className="text-gray-700">• Consultas con tu médico cuando sea necesario</p>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                        Recuerda: Si tienes síntomas preocupantes, no dudes en contactar a tu médico
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SupportMessages;