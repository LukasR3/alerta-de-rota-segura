import React, { useState, useEffect } from 'react';
import { AlertType, AlertLevel, Notification } from '../types';
import NotificationCard from './NotificationCard';
import { AlertTriangleIcon, BellIcon } from './Icons';

// Função auxiliar para calcular tempo decorrido
const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const alertTime = new Date(timestamp);
  const diffMs = now.getTime() - alertTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `${diffMins} min atrás`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d atrás`;
};

// Função auxiliar para gerar título do alerta
const getAlertTitle = (alert: any): string => {
  const levelEmoji = alert.alertLevel === 3 ? '🔴' : alert.alertLevel === 2 ? '🟠' : '�';
  return `${levelEmoji} ${alert.rationale || 'Alerta de Alagamento'}`;
};

// Função auxiliar para gerar localização
const getAlertLocation = (alert: any): string => {
  if (alert.region?.startCoord) {
    const lat = alert.region.startCoord.lat.toFixed(4);
    const lon = alert.region.startCoord.lon.toFixed(4);
    return `Coordenadas: ${lat}, ${lon}`;
  }
  return 'Localização não especificada';
};

const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/alerts');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Converter alertas da API para o formato Notification
        const convertedNotifications: Notification[] = data.alerts.map((alert: any) => ({
          id: alert.alertId || String(Math.random()),
          type: alert.alertType || AlertType.B,
          level: alert.alertLevel || AlertLevel.LEVEL_2,
          title: getAlertTitle(alert),
          description: alert.rationale || 'Alerta de alagamento detectado na região.',
          location: getAlertLocation(alert),
          time: getTimeAgo(alert.timestamp),
        }));

        setNotifications(convertedNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar alertas:', err);
        setError('Não foi possível carregar os alertas');
        setLoading(false);
      }
    };

    // Buscar alertas inicialmente
    fetchAlerts();

    // Atualizar a cada 5 segundos
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando alertas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-100 min-h-full flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="font-semibold">{error}</p>
          <p className="text-sm text-gray-600 mt-2">Verifique se o servidor está rodando</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 bg-gray-100 min-h-full flex items-center justify-center">
        <div className="text-center text-gray-600">
          <BellIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="font-semibold text-lg">Nenhum alerta ativo</p>
          <p className="text-sm mt-2">Aguardando alertas do n8n...</p>
        </div>
      </div>
    );
  }

  // Separa o alerta mais próximo dos demais para destaque
  const nearbyAlert = notifications[0]; // Primeiro alerta (mais recente)
  const otherNotifications = notifications.slice(1);

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