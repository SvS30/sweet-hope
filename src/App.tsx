import { Heart, Baby, TrendingUp, MessageCircle, Settings } from 'lucide-react';

import { useAppDispatch, useAppSelector, usePregnancy } from './hooks';

import Dashboard from './components/Dashboard';
import PregnancySetup from './components/PregnancySetup';
import WeeklyProgress from './components/WeeklyProgress';
import GrowthChart from './components/GrowthChart';
import SupportMessages from './components/SupportMessages';
import { setActiveTab } from './stores/slices/uiSlice';

function App() {

	const dispatch = useAppDispatch();
	const { pregnancyData, isSetupComplete, resetData } = usePregnancy();
	const { activeTab } = useAppSelector((state) => state.ui);

	const tabs = [
		{ id: 'dashboard', name: 'Inicio', icon: Heart },
		{ id: 'progress', name: 'Desarrollo', icon: Baby },
		{ id: 'growth', name: 'Crecimiento', icon: TrendingUp },
		{ id: 'support', name: 'Apoyo', icon: MessageCircle }
	];

	if (!isSetupComplete || !pregnancyData) {
		return (
			<>
				<PregnancySetup />
			</>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
			<div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
				{/* Header */}
				<div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 px-6 py-8 text-white">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold">Mi Dulce Espera</h1>
							<p className="text-pink-100">
								Semana {pregnancyData.currentWeek}, Día {pregnancyData.currentDay}
							</p>
						</div>
						<button
							onClick={resetData}
							className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
							aria-label="Configurar de nuevo"
						>
							<Settings className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 p-4">
					{activeTab === 'dashboard' && <Dashboard pregnancyData={pregnancyData} />}
					{activeTab === 'progress' && <WeeklyProgress pregnancyData={pregnancyData} />}
					{activeTab === 'growth' && <GrowthChart pregnancyData={pregnancyData} />}
					{activeTab === 'support' && <SupportMessages pregnancyData={pregnancyData} />}
				</div>

				{/* Bottom Navigation */}
				<div className="bg-white border-t border-gray-100 px-2 py-2">
					<div className="flex justify-around">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => dispatch(setActiveTab(tab.id))}
									className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${isActive
										? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600'
										: 'text-gray-500 hover:text-gray-700'
										}`}
									aria-label={`Ir a ${tab.name}`}
								>
									<Icon className={`w-5 h-5 ${isActive ? 'text-pink-600' : ''}`} />
									<span className="text-xs mt-1 font-medium">{tab.name}</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div >
	)
}

export default App
