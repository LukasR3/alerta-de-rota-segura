import React from 'react';
import { AlertType, AlertLevel, Notification } from '../types';
import NotificationCard from './NotificationCard';
import { AlertTriangleIcon } from './Icons';

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: AlertType.B,
    level: AlertLevel.LEVEL_2,
    title: '🚨 Viaduto Alcântara Machado',
    description: 'ALERTA: Ponto de alagamento intransitável na saída do viaduto em direção ao centro. Água atingiu 30cm de altura. Via completamente bloqueada para veículos. Rota alternativa recomendada pela Av. do Estado.',
    location: 'Próximo a você - 500m',
    time: 'agora',
  },
  {
    id: '2',
    type: AlertType.A,
    level: AlertLevel.LEVEL_1,
    title: 'Obras na calçada da Av. Paulista',
    description: 'Calçada bloqueada na altura do número 1578. Travessia de pedestres sendo realizada pela rua.',
    location: 'A 2.5km de distância',
    time: '10 min atrás',
  },
  {
    id: '3',
    type: AlertType.C,
    level: AlertLevel.LEVEL_3,
    title: 'Alerta de granizo - Zona Leste',
    description: 'Previsão de chuva de granizo para a região da Mooca e Tatuapé nas próximas horas. Proteja veículos e imóveis.',
    location: 'A 5km de distância',
    time: '35 min atrás',
  },
];

const NotificationsView: React.FC = () => {
  // Separa o alerta mais próximo dos demais para destaque
  const nearbyAlert = mockNotifications.find(n => n.location.includes('Próximo a você'));
  const otherNotifications = mockNotifications.filter(n => !n.location.includes('Próximo a você'));

  return (
    <div className="p-4 bg-gray-100 min-h-full">
      {nearbyAlert && (
        <section className="mb-6">
          <div className="flex items-center text-red-600 mb-2">
            <AlertTriangleIcon className="w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Alerta de Alto Risco Próximo</h2>
          </div>
          <NotificationCard notification={nearbyAlert} />
        </section>
      )}

      {otherNotifications.length > 0 && (
        <section>
          <h2 className="text-md font-semibold text-gray-700 mb-3 ml-1">Outros Alertas na Região</h2>
          <div className="space-y-4">
            {otherNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NotificationsView;