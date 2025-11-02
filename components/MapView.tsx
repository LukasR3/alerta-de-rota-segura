import React, { useState } from 'react';
import { CarIcon, UserIcon } from './Icons';
import RouteInfoPanel from './RouteInfoPanel';

// Componente para o ícone de carro, adaptado para uso dentro do SVG
const CarIconSvg = () => (
    <svg x="-10" y="-10" width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h-2.25m0-11.25h2.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H3.375m0-4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h14.25" stroke="white" strokeWidth="2.5" />
    </svg>
)

// Componente para o ícone de pedestre, adaptado para uso dentro do SVG
const UserIconSvg = () => (
    <svg x="-10" y="-10" width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="white" strokeWidth="2.5" />
    </svg>
)

// Componente para o ícone de pino de localização, adaptado para uso dentro do SVG
const MapPinIconSvg = ({ fill }: { fill: string }) => (
    <svg x="-12" y="-22" width="24" height="24" viewBox="0 0 24 24" fill={fill}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="white" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)


const MapView: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 overflow-hidden">
        {/* Fundo de mapa estilizado com SVG - mais detalhado */}
        <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
                {/* Grid do mapa */}
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1"/>
                </pattern>
                
                {/* Padrão de edifícios */}
                <pattern id="buildings" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect x="10" y="60" width="15" height="35" fill="rgba(100, 100, 120, 0.3)" />
                  <rect x="30" y="50" width="18" height="45" fill="rgba(100, 100, 120, 0.25)" />
                  <rect x="70" y="55" width="12" height="40" fill="rgba(100, 100, 120, 0.28)" />
                </pattern>
                
                {/* Gradiente para rio */}
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                </linearGradient>
            </defs>
            
            {/* Grid de fundo */}
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Área de edifícios */}
            <rect width="100%" height="100%" fill="url(#buildings)" opacity="0.4" />
            
            {/* Rio Tietê (representação) */}
            <path 
              d="M -50 150 Q 100 130, 250 140 T 450 145" 
              stroke="url(#riverGradient)" 
              strokeWidth="35" 
              fill="none"
              opacity="0.6"
            />
            
            {/* Ruas principais - com mais realismo */}
            {/* Av. Alcântara Machado (Radial Leste) */}
            <line x1="5%" y1="85%" x2="70%" y2="20%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="40" />
            <line x1="5%" y1="85%" x2="70%" y2="20%" stroke="rgba(255, 200, 100, 0.08)" strokeWidth="38" />
            
            {/* Av. Paulista */}
            <line x1="-5%" y1="35%" x2="105%" y2="25%" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="45" />
            <line x1="-5%" y1="35%" x2="105%" y2="25%" stroke="rgba(255, 200, 100, 0.1)" strokeWidth="43" />
            
            {/* Av. do Estado */}
            <line x1="10%" y1="-5%" x2="55%" y2="105%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="38" />
            
            {/* Ruas secundárias */}
            <line x1="75%" y1="0%" x2="20%" y2="100%" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="25" />
            <line x1="-10%" y1="60%" x2="110%" y2="70%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="22" />
            
            {/* Quarteirões */}
            {[...Array(8)].map((_, i) => (
              <rect 
                key={i}
                x={30 + i * 45} 
                y={80 + (i % 3) * 60} 
                width="35" 
                height="45" 
                fill="rgba(120, 120, 140, 0.15)" 
                stroke="rgba(255, 255, 255, 0.05)" 
                strokeWidth="1"
              />
            ))}
            
            {/* Áreas verdes (parques) */}
            <ellipse cx="320" cy="200" rx="30" ry="25" fill="rgba(34, 197, 94, 0.2)" />
            <ellipse cx="80" cy="500" rx="40" ry="35" fill="rgba(34, 197, 94, 0.15)" />
        </svg>

      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 375 667"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            .route-path {
              stroke-dasharray: 12, 8;
              animation: dash 2s linear infinite;
            }
            @keyframes dash {
              to {
                stroke-dashoffset: -20;
              }
            }
            .pulsating-alert-bg {
              animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
              transform-origin: center;
            }
            .pulsating-location-bg {
              animation: pulse-location 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
              transform-origin: center;
            }
            @keyframes pulse {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
              }
              70% {
                transform: scale(2.8);
                opacity: 0;
              }
              100% {
                transform: scale(2.8);
                opacity: 0;
              }
            }
            @keyframes pulse-location {
              0% {
                transform: scale(0.9);
                opacity: 1;
              }
              70% {
                transform: scale(2.2);
                opacity: 0;
              }
              100% {
                transform: scale(2.2);
                opacity: 0;
              }
            }
            .alert-marker {
              cursor: pointer;
              transition: transform 0.2s;
            }
            .alert-marker:hover {
              transform: scale(1.2);
            }
            .street-label {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              pointer-events: none;
            }
          `}</style>

          {/* Labels de Ruas */}
          <text x="180" y="180" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontWeight="600" className="street-label" transform="rotate(-35 180 180)">
            Av. Alcântara Machado
          </text>
          <text x="120" y="110" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontWeight="600" className="street-label">
            Av. Paulista
          </text>
          
          {/* Bairros */}
          <text x="300" y="580" fill="rgba(255, 255, 255, 0.3)" fontSize="14" fontWeight="bold" className="street-label">
            MOOCA
          </text>
          <text x="30" y="70" fill="rgba(255, 255, 255, 0.3)" fontSize="14" fontWeight="bold" className="street-label">
            CERQUEIRA CÉSAR
          </text>

          {/* Rota principal: Da Mooca para a Av. Paulista */}
          {/* Borda da rota (sombra) */}
          <polyline
            points="350,550 320,520 280,480 250,450 200,380 180,300 140,240 100,200 80,100"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rota principal animada */}
          <polyline
            points="350,550 320,520 280,480 250,450 200,380 180,300 140,240 100,200 80,100"
            stroke="rgba(59, 130, 246, 0.9)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="route-path"
          />
          {/* Halo da rota */}
          <polyline
            points="350,550 320,520 280,480 250,450 200,380 180,300 140,240 100,200 80,100"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ponto de Início: Rua da Mooca */}
          <g transform="translate(350, 550)">
            <circle r="14" fill="rgba(52, 199, 89, 0.2)" />
            <circle r="11" fill="#34C759" stroke="white" strokeWidth="3" />
            <circle r="4" fill="white" />
            <text x="-60" y="5" fill="white" fontSize="13" fontWeight="bold" textAnchor="end" className="street-label">Rua da Mooca</text>
            <text x="-60" y="18" fill="rgba(255, 255, 255, 0.7)" fontSize="10" textAnchor="end" className="street-label">Ponto de partida</text>
          </g>

          {/* Ponto Final: Av. Paulista */}
          <g transform="translate(80, 100)">
            <circle r="16" fill="rgba(0, 122, 255, 0.2)" />
            <MapPinIconSvg fill="#007AFF" />
            <text x="18" y="-8" fill="white" fontSize="13" fontWeight="bold" className="street-label">Av. Paulista</text>
            <text x="18" y="5" fill="rgba(255, 255, 255, 0.7)" fontSize="10" className="street-label">Destino final</text>
          </g>
          
          {/* Alerta 1: Alagamento no Viaduto (Veículos) - NÍVEL 2 LARANJA */}
          <g 
            transform="translate(180, 300)" 
            className="alert-marker"
            onClick={() => setSelectedAlert(selectedAlert === 1 ? null : 1)}
          >
            <circle className="pulsating-alert-bg" r="10" fill="rgba(249, 115, 22, 0.4)" />
            <circle r="16" fill="rgba(249, 115, 22, 1)" stroke="white" strokeWidth="3" opacity="0.95"/>
            <circle r="13" fill="rgba(249, 115, 22, 1)" stroke="white" strokeWidth="2"/>
            <CarIconSvg />
            {selectedAlert === 1 && (
              <>
                <rect x="20" y="-35" width="140" height="65" fill="white" rx="8" stroke="rgba(249, 115, 22, 1)" strokeWidth="2"/>
                <text x="30" y="-20" fill="rgba(249, 115, 22, 1)" fontSize="11" fontWeight="bold">🚨 Nível 2</text>
                <text x="30" y="-8" fill="#333" fontSize="9" fontWeight="600">Viaduto Alagado</text>
                <text x="30" y="4" fill="#666" fontSize="8">Via intransitável</text>
                <text x="30" y="16" fill="#666" fontSize="8">⏱ Agora · 📍 500m</text>
              </>
            )}
          </g>

          {/* Alerta 2: Obras na calçada (Pedestres) - NÍVEL 1 AMARELO */}
          <g 
            transform="translate(105, 200)" 
            className="alert-marker"
            onClick={() => setSelectedAlert(selectedAlert === 2 ? null : 2)}
          >
            <circle className="pulsating-alert-bg" r="10" fill="rgba(234, 179, 8, 0.4)" />
            <circle r="16" fill="rgba(234, 179, 8, 1)" stroke="white" strokeWidth="3" opacity="0.95"/>
            <circle r="13" fill="rgba(234, 179, 8, 1)" stroke="white" strokeWidth="2"/>
            <UserIconSvg />
            {selectedAlert === 2 && (
              <>
                <rect x="20" y="-35" width="130" height="65" fill="white" rx="8" stroke="rgba(234, 179, 8, 1)" strokeWidth="2"/>
                <text x="30" y="-20" fill="rgba(234, 179, 8, 1)" fontSize="11" fontWeight="bold">⚠️ Nível 1</text>
                <text x="30" y="-8" fill="#333" fontSize="9" fontWeight="600">Obras na Calçada</text>
                <text x="30" y="4" fill="#666" fontSize="8">Desvio necessário</text>
                <text x="30" y="16" fill="#666" fontSize="8">⏱ 10min · 📍 2.5km</text>
              </>
            )}
          </g>

          {/* Indicador de Posição Atual - Melhorado */}
          <g transform="translate(250, 450)">
            <circle className="pulsating-location-bg" r="12" fill="rgba(59, 130, 246, 0.3)" />
            <circle r="10" fill="rgba(59, 130, 246, 0.8)" stroke="white" strokeWidth="3" />
            <circle r="4" fill="white" />
            <text x="18" y="5" fill="white" fontSize="11" fontWeight="600" className="street-label">Você está aqui</text>
          </g>

        </svg>
      </div>
      
      <RouteInfoPanel />

    </div>
  );
};

export default MapView;