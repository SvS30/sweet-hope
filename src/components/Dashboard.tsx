import { useEffect, useState } from "react";
import { Calendar, Clock, Gift, Heart } from "lucide-react";

import { babySize } from "../constants/babyData";
import type { PregnancyData } from "../types/pregnancyData";
import { useAIContent } from "../hooks";

interface Props {
    pregnancyData: PregnancyData
}

const Dashboard: React.FC<Props> = ({ pregnancyData }) => {

    const [dailyMessage, setDailyMessage] = useState<string>('');
    const { generateContent, isLoading: isLoadingMessage } = useAIContent();

    const currentBabySize = babySize[pregnancyData.currentWeek as keyof typeof babySize] || babySize[40];

    useEffect(() => {
        const loadDailyMessage = async () => {
            try {
                const response = await generateContent({
                    type: 'daily_message',
                    week: pregnancyData.currentWeek,
                    babyName: pregnancyData.babyName
                });
                setDailyMessage(response.content);
            } catch (error) {
                console.error(`Error loading daily message: ${error}`);
                setDailyMessage('Cada día que pasa, tu cuerpo hace algo increíble: crear vida. Recuerda descansar, alimentarte bien y disfrutar cada momento de esta hermosa etapa. ¡Eres increíble! 💝');
            }
        };
        loadDailyMessage();
    }, [pregnancyData.currentWeek, pregnancyData.babyName, generateContent]);

    const calculateDaysLeft = () => {
        const today = new Date();
        const dueDate = new Date(pregnancyData.dueDate);
        const diffTime = dueDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const daysLeft = calculateDaysLeft();
    const progressPercentage = ((pregnancyData.currentWeek - 1) / 39) * 100;

    return (
        <div className="space-y-6">
            {/* Saludo personalizado */}
            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    ¡Hola, futura mamá! 👋
                </h2>
                <p className="text-gray-600">
                    {pregnancyData.babyName
                        ? `${pregnancyData.babyName} está creciendo hermosamente dentro de ti`
                        : 'Tu bebé está creciendo hermosamente dentro de ti'}
                </p>
            </div>

            {/* Tamaño del bebé */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">{currentBabySize.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Hoy tu bebé mide como...
                    </h3>
                    <p className="text-2xl font-semibold text-pink-600 mb-1">
                        {currentBabySize.item}
                    </p>
                    <p className="text-gray-500">
                        Aproximadamente {currentBabySize.size}
                    </p>
                </div>
            </div>

            {/* Progreso del embarazo */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-pink-500" />
                        Tu progreso
                    </h3>
                    <span className="text-2xl font-bold text-purple-600">
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <Calendar className="w-4 h-4 mr-1 text-indigo-500" />
                        </div>
                        <p className="text-gray-500">Semanas completadas</p>
                        <p className="font-semibold text-indigo-600">{pregnancyData.currentWeek - 1}</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 mr-1 text-pink-500" />
                        </div>
                        <p className="text-gray-500">Días restantes</p>
                        <p className="font-semibold text-pink-600">{daysLeft}</p>
                    </div>
                </div>
            </div>

            {/* Mensaje del día */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border border-yellow-200">
                <div className="flex items-start">
                    <Gift className={`w-6 h-6 text-orange-500 mt-1 mr-3 flex-shrink-0 ${isLoadingMessage ? 'animate-pulse' : ''}`} />
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Mensaje del día {!isLoadingMessage && '✨'}
                        </h3>
                        {isLoadingMessage ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <span className="text-gray-500 text-sm">Generando mensaje personalizado...</span>
                            </div>
                        ) : (
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {dailyMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;