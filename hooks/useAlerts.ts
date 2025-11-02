/**
 * React Hook para gerenciar alertas de enchente
 * 
 * Fornece funcionalidades para:
 * - Buscar alertas da API
 * - Adicionar novos alertas
 * - Atualizar alertas em tempo real
 * - Polling automático (opcional)
 */

import { useState, useEffect, useCallback } from 'react';
import { FloodAlert, fetchAlerts, sendFloodAlert, convertFloodAlertToNotification } from '../services/alertService';
import { Notification } from '../types';

interface UseAlertsOptions {
  enablePolling?: boolean;
  pollingInterval?: number; // em milissegundos
  autoFetch?: boolean;
}

interface UseAlertsReturn {
  alerts: Notification[];
  floodAlerts: FloodAlert[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addAlert: (alert: FloodAlert) => Promise<boolean>;
}

/**
 * Hook para gerenciar alertas de enchente
 */
export function useAlerts(options: UseAlertsOptions = {}): UseAlertsReturn {
  const {
    enablePolling = false,
    pollingInterval = 30000, // 30 segundos por padrão
    autoFetch = true,
  } = options;

  const [floodAlerts, setFloodAlerts] = useState<FloodAlert[]>([]);
  const [alerts, setAlerts] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca alertas da API
   */
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedAlerts = await fetchAlerts();
      setFloodAlerts(fetchedAlerts);
      
      // Converte para formato de Notification
      const notifications = fetchedAlerts.map((floodAlert, index) => 
        convertFloodAlertToNotification(floodAlert, `alert_${index}`)
      );
      setAlerts(notifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adiciona um novo alerta
   */
  const addAlert = useCallback(async (alert: FloodAlert): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const result = await sendFloodAlert(alert);
      
      if (result.ok) {
        // Adiciona o alerta localmente
        setFloodAlerts(prev => [alert, ...prev]);
        
        // Converte e adiciona às notificações
        const notification = convertFloodAlertToNotification(
          alert, 
          result.alertId || `alert_${Date.now()}`
        );
        setAlerts(prev => [notification, ...prev]);
        
        return true;
      } else {
        setError(result.error || 'Failed to add alert');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add alert');
      console.error('Error adding alert:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch inicial
  useEffect(() => {
    if (autoFetch) {
      refetch();
    }
  }, [autoFetch, refetch]);

  // Polling automático
  useEffect(() => {
    if (!enablePolling) return;

    const interval = setInterval(() => {
      refetch();
    }, pollingInterval);

    return () => clearInterval(interval);
  }, [enablePolling, pollingInterval, refetch]);

  return {
    alerts,
    floodAlerts,
    loading,
    error,
    refetch,
    addAlert,
  };
}

/**
 * Exemplo de uso em um componente:
 * 
 * function MyComponent() {
 *   const { alerts, loading, error, addAlert } = useAlerts({
 *     enablePolling: true,
 *     pollingInterval: 30000, // Atualiza a cada 30 segundos
 *   });
 * 
 *   const handleNewAlert = async () => {
 *     const newAlert: FloodAlert = {
 *       type: 'flood_alert',
 *       version: '1.0',
 *       issuedAt: new Date().toISOString(),
 *       region: { lat: -23.5505, lon: -46.6333 },
 *       riskLevel: 'alto',
 *       alertLevel: 2,
 *       impact: 'transito',
 *       confidence: 0.85,
 *       text: 'Novo alagamento detectado',
 *       rationale: 'Chuva intensa',
 *     };
 * 
 *     const success = await addAlert(newAlert);
 *     if (success) {
 *       console.log('Alert added successfully!');
 *     }
 *   };
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   return (
 *     <div>
 *       <button onClick={handleNewAlert}>Add Alert</button>
 *       {alerts.map(alert => (
 *         <div key={alert.id}>{alert.title}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */
