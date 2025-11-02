
import React, { useState } from 'react';
import { Notification, AlertType, AlertLevel } from '../types';
import { UserIcon, CarIcon, HomeIcon, ChevronDownIcon, MapPinIcon, ClockIcon } from './Icons';

interface NotificationCardProps {
  notification: Notification;
}

const alertConfig = {
  [AlertType.A]: {
    icon: <UserIcon className="w-6 h-6" />,
    label: 'Afeta Pedestres',
  },
  [AlertType.B]: {
    icon: <CarIcon className="w-6 h-6" />,
    label: 'Afeta Automóveis',
  },
  [AlertType.C]: {
    icon: <HomeIcon className="w-6 h-6" />,
    label: 'Afeta Imóveis',
  },
};

const levelConfig = {
  [AlertLevel.LEVEL_1]: {
    color: 'yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
    label: 'Nível 1 - Baixo Risco',
  },
  [AlertLevel.LEVEL_2]: {
    color: 'orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-700',
    label: 'Nível 2 - Médio Risco',
  },
  [AlertLevel.LEVEL_3]: {
    color: 'red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-600',
    textColor: 'text-red-700',
    label: 'Nível 3 - Alto Risco',
  },
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeConfig = alertConfig[notification.type];
  const levelCfg = levelConfig[notification.level];

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-8 ${levelCfg.borderColor} transition-all duration-300 ease-in-out`}
    >
      <div className="p-4" onClick={() => setIsExpanded(!isExpanded)} role="button" aria-expanded={isExpanded}>
        <div className="flex items-start">
          <div className={`${levelCfg.textColor} mr-4 mt-1`}>{typeConfig.icon}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-bold ${levelCfg.textColor} mb-1`}>
                  {typeConfig.label}
                </p>
                <span className={`inline-block px-2 py-1 text-xs font-semibold ${levelCfg.bgColor} ${levelCfg.textColor} rounded-full`}>
                  {levelCfg.label}
                </span>
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">{notification.title}</h3>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pl-10 space-y-3 animate-fade-in">
            <p className="text-gray-600">{notification.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{notification.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>{notification.time}</span>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotificationCard;
