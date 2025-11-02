import React, { useState, useEffect } from 'react';

interface HomeScreenProps {
  onNotificationClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNotificationClick }) => {
  const [showNotification, setShowNotification] = useState(false);
  
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long'
  });

  // Delay de 4 segundos para mostrar a notificação
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Wallpaper com efeito de movimento */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Conteúdo da tela inicial */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Relógio */}
        <div className="text-center mb-4">
          <div className="text-7xl font-light text-white mb-2 tracking-tight">
            {currentTime}
          </div>
          <div className="text-lg text-white/90 font-normal capitalize">
            {currentDate}
          </div>
        </div>

        {/* Notificação de Alerta - Animada com delay de 4 segundos */}
        {showNotification && (
          <div 
            onClick={onNotificationClick}
            className="mt-8 w-full max-w-[340px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 animate-slide-down"
          >
            <div className="flex items-start space-x-3">
            {/* Ícone do App */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            {/* Conteúdo da notificação */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900">
                  Alerta de Rota Segura
                </p>
                <span className="text-xs text-gray-500">agora</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                � Alerta de Enchente - Nível 2
              </p>
              <p className="text-xs text-gray-600 line-clamp-2">
                Alagamento detectado no Viaduto Alcântara Machado. Via intransitável para veículos. Toque para mais detalhes.
              </p>
            </div>
          </div>

          {/* Indicador de deslizar */}
          <div className="mt-3 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
        )}

        {/* Dica de interação */}
        {showNotification && (
          <div className="mt-6 text-white/70 text-sm flex items-center space-x-2 animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            <span>Toque na notificação para abrir</span>
          </div>
        )}
      </div>

      {/* Ícones de apps na parte inferior (decoração) */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          {['📱', '📧', '📷', '🎵', '⚙️', '🌐', '📅', '🗺️'].slice(0, 4).map((emoji, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
                {emoji}
              </div>
            </div>
          ))}
        </div>
        
        {/* Dock */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-3 flex justify-around items-center">
          {['📞', '💬', '🎮', '📸'].map((emoji, idx) => (
            <div key={idx} className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
              {emoji}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .delay-75 {
          animation-delay: 75ms;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
