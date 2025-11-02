import React from 'react';
import { ClockIcon, RouteIcon, InfoIcon, AlertTriangleIcon } from './Icons';

const RouteInfoPanel: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 right-4">
      {/* Alerta de risco */}
      <div className="bg-orange-500 text-white p-3 rounded-t-xl shadow-lg flex items-center animate-pulse-slow">
        <AlertTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
        <p className="text-sm font-semibold">2 alertas detectados na sua rota</p>
      </div>
      
      {/* Painel principal */}
      <div className="bg-white/95 backdrop-blur-xl p-4 rounded-b-xl shadow-2xl border-x border-b border-gray-200/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Sua Rota Atual</h3>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Rua da Mooca
              </span>
              <span>→</span>
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                Av. Paulista, 1578
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              🚦 Trânsito Intenso
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">Chegada</p>
            <p className="text-base font-bold text-gray-800">10:15</p>
            <p className="text-xs text-gray-400">+8 min atraso</p>
          </div>
          
          <div className="flex flex-col items-center text-center border-l border-r border-gray-200">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-2">
              <RouteIcon className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">Distância</p>
            <p className="text-base font-bold text-gray-800">12.8 km</p>
            <p className="text-xs text-gray-400">Via principal</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-2">
              <InfoIcon className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xs font-semibold text-gray-500 mb-0.5">Tempo</p>
            <p className="text-base font-bold text-gray-800">34 min</p>
            <p className="text-xs text-gray-400">Estimado</p>
          </div>
        </div>
        
        {/* Botão de ação */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Ver Rota Alternativa
        </button>
      </div>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default RouteInfoPanel;