import type React from "react";
import type { PregnancyData } from "../types/pregnancyData";
import { growthData } from "../constants/babyData";
import { Ruler, Scale, TrendingUp } from "lucide-react";

interface Props {
    pregnancyData: PregnancyData
}

const GrowthChart: React.FC<Props> = ({ pregnancyData }) => {

    const getCurrentStats = () => {
        const currentData = growthData.find(data => data.week <= pregnancyData.currentWeek);
        return currentData || growthData[0];
    }

    const currentStats = getCurrentStats();

    return (
        <div className="space-y-6">
            {/* Estadísticas actuales */}
            <div className="bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Estadísticas aproximadas - Semana {pregnancyData.currentWeek}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/70 p-4 rounded-xl text-center">
                        <Ruler className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Longitud</p>
                        <p className="text-2xl font-bold text-blue-600">{currentStats.length} cm</p>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl text-center">
                        <Scale className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Peso aprox.</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {currentStats.weight < 1000 ? `${currentStats.weight} g` : `${(currentStats.weight / 1000).toFixed(1)} kg`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Gráfica de crecimiento */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Curva de crecimiento
                </h3>

                {/* Longitud */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Longitud (cm)</h4>
                    <div className="space-y-2">
                        {growthData.map((data, index) => (
                            <div key={`${data.week}-${index}`} className="flex items-center">
                                <span className="w-12 text-sm text-gray-500">S{data.week}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-2">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${data.week <= pregnancyData.currentWeek
                                                ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                                                : 'bg-gray-300'
                                            }`}
                                        style={{ width: `${(data.length / 40) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="w-16 text-sm text-gray-700 text-right">{data.length} cm</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Peso */}
                <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Peso</h4>
                    <div className="space-y-2">
                        {growthData.map((data, index) => (
                            <div key={`weight-${data.week}-${index}`} className="flex items-center">
                                <span className="w-12 text-sm text-gray-500">S{data.week}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-2">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${data.week <= pregnancyData.currentWeek
                                                ? 'bg-gradient-to-r from-purple-400 to-purple-500'
                                                : 'bg-gray-300'
                                            }`}
                                        style={{ width: `${Math.min((data.weight / 3500) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <span className="w-16 text-sm text-gray-700 text-right">
                                    {data.weight < 1000 ? `${data.weight}g` : `${(data.weight / 1000).toFixed(1)}kg`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Nota informativa */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <p className="text-sm text-yellow-800 text-center">
                    📊 Estas medidas son aproximadas y pueden variar. Cada bebé se desarrolla a su propio ritmo.
                    Consulta siempre con tu médico para un seguimiento personalizado.
                </p>
            </div>
        </div>
    );
}

export default GrowthChart;