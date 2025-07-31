import { useEffect, useState } from "react";
import { Brain, ChevronLeft, ChevronRight, Eye, Zap } from "lucide-react";

import type { PregnancyData } from "../types/pregnancyData";
import { weeklyDevelopment } from "../constants/babyData";
import { useAIContent } from "../hooks";

interface Props {
    pregnancyData: PregnancyData
}

const WeeklyProgress: React.FC<Props> = ({ pregnancyData }) => {

    const [selectedWeek, setSelectedWeek] = useState<number>(pregnancyData.currentWeek);
    const { generateContent, isLoading: isLoadingAI } = useAIContent();
    const [aiDevelopmentInfo, setAiDevelopmentInfo] = useState<string>('');

    useEffect(() => {
        const loadAIDevelopmentInfo = async () => {
            // Solo cargar contenido AI para la semana actual
            if (selectedWeek === pregnancyData.currentWeek) {
                try {
                    const response = await generateContent({
                        type: 'development_info',
                        week: selectedWeek,
                        babyName: pregnancyData.babyName
                    });
                    setAiDevelopmentInfo(response.content);
                } catch (error) {
                    console.error('Error loading AI development info:', error);
                    setAiDevelopmentInfo('');
                }
            } else {
                setAiDevelopmentInfo('');
            }
        };

        loadAIDevelopmentInfo();
    }, [selectedWeek, pregnancyData.currentWeek, pregnancyData.babyName, generateContent]);

    const getWeekData = (week: number) => {
        // Find the closest week data
        const availableWeeks = Object.keys(weeklyDevelopment).map(Number).sort((a, b) => a - b);
        const closestWeek = availableWeeks.reduce((prev, curr) =>
            Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
        );
        return weeklyDevelopment[closestWeek as keyof typeof weeklyDevelopment];
    };

    const weekData = getWeekData(selectedWeek);

    const goToPreviousWeek = () => {
        setSelectedWeek(Math.max(1, selectedWeek - 1));
    };

    const goToNextWeek = () => {
        setSelectedWeek(Math.min(42, selectedWeek + 1));
    };

    return (
        <div className="space-y-6">
            {/* Navegación de semanas */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                    <button
                        onClick={goToPreviousWeek}
                        disabled={selectedWeek <= 1}
                        className="p-2 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Semana {selectedWeek}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {selectedWeek === pregnancyData.currentWeek ? 'Semana actual' : 'Navegar por semanas'}
                        </p>
                    </div>

                    <button
                        onClick={goToNextWeek}
                        disabled={selectedWeek >= 42}
                        className="p-2 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Título de la semana */}
            <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                    {weekData.title}
                </h3>
                <p className="text-gray-600 text-center">
                    {pregnancyData.babyName ? `${pregnancyData.babyName} está` : 'Tu bebé está'}
                    {' '}en una etapa emocionante de desarrollo
                </p>
            </div>

            {/* Desarrollos de esta semana */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-green-500" />
                    Desarrollos de esta semana
                </h4>
                <div className="space-y-3">
                    {weekData.developments.map((development, index) => (
                        <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-700 text-sm">{development}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hitos importantes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Hitos importantes
                </h4>
                <div className="space-y-3">
                    {weekData.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-700 text-sm">{milestone}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Información adicional con IA (solo para semana actual) */}
            {selectedWeek === pregnancyData.currentWeek && (
                <div className="bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100 p-6 rounded-2xl border border-indigo-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-indigo-500" />
                        Información personalizada de esta semana
                    </h4>
                    {isLoadingAI ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-gray-500 text-sm">Generando información personalizada...</span>
                        </div>
                    ) : aiDevelopmentInfo ? (
                        <p className="text-gray-700 text-sm leading-relaxed">{aiDevelopmentInfo}</p>
                    ) : (
                        <p className="text-gray-600 text-sm italic">
                            Información adicional disponible para la semana actual
                        </p>
                    )}
                </div>
            )}

            {/* Indicador de semana actual */}
            {selectedWeek === pregnancyData.currentWeek && (
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl border border-pink-200">
                    <div className="flex items-center justify-center">
                        <Eye className="w-5 h-5 mr-2 text-pink-600" />
                        <span className="text-pink-800 font-medium">Esta es tu semana actual</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeeklyProgress;