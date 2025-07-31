import { useCallback, useState } from "react";
import { Baby, Calendar, Heart, User } from "lucide-react";

import { usePregnancy } from "../hooks"

const PregnancySetup: React.FC = () => {

    const { calculatePregnancyData, saveData, isLoading } = usePregnancy();
    const [lastPeriodDate, setLastPeriodDate] = useState('');
    const [babyName, setBabyName] = useState('');
    const [motherName, setMotherName] = useState('');

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (lastPeriodDate) {
            const pregnancyData = calculatePregnancyData(lastPeriodDate, babyName, motherName);
            saveData(pregnancyData);
        }
    }, [lastPeriodDate, babyName, motherName, calculatePregnancyData, saveData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Dulce Espera</h1>
                    <p className="text-gray-600">Tu compañera durante este hermoso viaje</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="flex items-center text-gray-700 font-medium mb-3">
                            <User className="w-5 h-5 mr-2 text-indigo-500" />
                            Tu nombre (opcional)
                        </label>
                        <input
                            type="text"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            placeholder="¿Cómo te llamas?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-all"
                            autoComplete="given-name"
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-gray-700 font-medium mb-3">
                            <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                            Fecha de tu última menstruación
                        </label>
                        <input
                            type="date"
                            value={lastPeriodDate}
                            onChange={(e) => setLastPeriodDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all"
                            required
                            max={new Date().toISOString().split('T')[0]}
                            aria-describedby="period-date-help"
                        />
                        <p id="period-date-help" className="text-xs text-gray-500 mt-1">
                            Selecciona el primer día de tu última menstruación
                        </p>
                    </div>

                    <div>
                        <label className="flex items-center text-gray-700 font-medium mb-3">
                            <Baby className="w-5 h-5 mr-2 text-purple-500" />
                            Nombre de tu bebé (opcional)
                        </label>
                        <input
                            type="text"
                            value={babyName}
                            onChange={(e) => setBabyName(e.target.value)}
                            placeholder="¿Cómo le llamas a tu bebé?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none transition-all"
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        aria-describedby="submit-help"
                    >
                        {isLoading ? 'Configurando...' : 'Comenzar mi seguimiento ✨'}
                    </button>
                    <p id="submit-help" className="text-xs text-gray-500 text-center">
                        Al continuar, aceptas que la información se guarde en tu dispositivo
                    </p>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>🔒 Toda la información se guarda de forma segura en tu dispositivo</p>
                    <p className="mt-1">No compartimos tus datos personales</p>
                </div>
            </div>
        </div>
    );
};

export default PregnancySetup;