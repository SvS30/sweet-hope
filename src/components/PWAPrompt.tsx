import { useEffect, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";

import { usePWA } from "../hooks/usePWA";

const PWAPrompt: React.FC = () => {

    const { isInstallable, installApp } = usePWA();
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        if (isInstallable) {
            // Show prompt after 3s
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isInstallable]);

    if (!showPrompt || !isInstallable) return null;

    const handleInstall = () => {
        installApp();
        setShowPrompt(false);
    }

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 p-4 animate-slide-up">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                                Instalar Mi Dulce Espera
                            </h3>
                            <p className="text-xs text-gray-600">
                                Accede más rápido desde tu pantalla de inicio
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={handleDismiss}
                        className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Ahora no
                    </button>
                    <button
                        onClick={handleInstall}
                        className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
                    >
                        <Download className="w-4 h-4 mr-1" />
                        Instalar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PWAPrompt;