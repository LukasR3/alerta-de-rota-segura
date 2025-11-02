import React, { useState, useCallback } from 'react';
import MapView from './components/MapView';
import NotificationsView from './components/NotificationsView';
import HomeScreen from './components/HomeScreen';
import BottomNav from './components/BottomNav';
import { MapIcon, BellIcon } from './components/Icons';
import StatusBar from './components/StatusBar';

type View = 'map' | 'notifications';
type AppState = 'home' | 'app';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [activeView, setActiveView] = useState<View>('notifications');

  const handleNavClick = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleNotificationClick = useCallback(() => {
    // Simula abertura do app ao clicar na notificação
    setAppState('app');
    setActiveView('notifications');
  }, []);

  const handleBackToHome = useCallback(() => {
    // Volta para a tela inicial
    setAppState('home');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      {/* Estrutura do corpo do celular */}
      <div className="relative">
        {/* Corpo do smartphone */}
        <div className="w-[375px] h-[812px] bg-gradient-to-b from-gray-900 to-black rounded-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[14px] border-gray-800 overflow-hidden relative">
          {/* Reflexo na borda */}
          <div className="absolute inset-0 rounded-[36px] border-[1px] border-white/10 pointer-events-none"></div>
          
          {/* A tela do aplicativo */}
          <div className="w-full h-full bg-gray-100 flex flex-col font-sans antialiased rounded-[36px] overflow-hidden">
            {appState === 'home' ? (
              // Tela inicial do smartphone
              <>
                <StatusBar />
                <HomeScreen onNotificationClick={handleNotificationClick} />
              </>
            ) : (
              // Aplicativo aberto
              <>
                <StatusBar />
                <header className="bg-brand-blue text-white shadow-md z-10">
                  <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                      {/* Botão voltar para Home */}
                      <button
                        onClick={handleBackToHome}
                        className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                        title="Voltar para tela inicial"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </button>
                      
                      <h1 className="text-xl font-bold flex items-center justify-center flex-1">
                        {activeView === 'map' ? (
                          <>
                            <MapIcon className="w-6 h-6 mr-2" />
                            <span>Mapa de Rota</span>
                          </>
                        ) : (
                          <>
                            <BellIcon className="w-6 h-6 mr-2" />
                            <span>Central de Alertas</span>
                          </>
                        )}
                      </h1>
                      
                      {/* Espaço para balancear o layout */}
                      <div className="w-9"></div>
                    </div>
                  </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                  {activeView === 'map' && <MapView />}
                  {activeView === 'notifications' && <NotificationsView />}
                </main>

                <BottomNav activeView={activeView} onNavClick={handleNavClick} />
              </>
            )}
          </div>
          
          {/* Notch (entalhe superior) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50 flex items-center justify-center">
            {/* Speaker (alto-falante) */}
            <div className="w-[50px] h-[5px] bg-gray-800 rounded-full"></div>
            {/* Câmera frontal */}
            <div className="absolute right-4 w-[10px] h-[10px] bg-gray-900 rounded-full border border-gray-700"></div>
          </div>
        </div>

        {/* Botão de Power (lateral direita) */}
        <div className="absolute right-0 top-[160px] w-[4px] h-[80px] bg-gray-700 rounded-l-md shadow-inner"></div>
        
        {/* Botões de Volume (lateral esquerda) */}
        <div className="absolute left-0 top-[140px] w-[4px] h-[50px] bg-gray-700 rounded-r-md shadow-inner"></div>
        <div className="absolute left-0 top-[200px] w-[4px] h-[50px] bg-gray-700 rounded-r-md shadow-inner"></div>
        
        {/* Botão silencioso (lateral esquerda - superior) */}
        <div className="absolute left-0 top-[100px] w-[4px] h-[30px] bg-gray-700 rounded-r-md shadow-inner"></div>
      </div>
    </div>
  );
};

export default App;