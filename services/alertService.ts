/**
 * Cliente HTTP para comunicação com a API de alertas
 * 
 * Este arquivo fornece funções para enviar e receber alertas de enchente
 */

export interface FloodAlert {
  type: 'flood_alert';
  version: '1.0';
  issuedAt: string;
  region: { lat: number; lon: number };
  riskLevel: 'baixo' | 'moderado' | 'alto' | 'critico';
  alertLevel: 1 | 2 | 3;
  impact: 'fluxo_pessoas' | 'transito' | 'moradias_comercio';
  confidence: number | null;
  text: string;
  rationale: string;
}

// Mapeamento de riskLevel para AlertLevel do sistema
const riskLevelToAlertLevel: Record<FloodAlert['riskLevel'], 1 | 2 | 3> = {
  'baixo': 1,
  'moderado': 2,
  'alto': 2,
  'critico': 3,
};

// Mapeamento de impact para AlertType do sistema
const impactToAlertType: Record<FloodAlert['impact'], 'A' | 'B' | 'C'> = {
  'fluxo_pessoas': 'A',
  'transito': 'B',
  'moradias_comercio': 'C',
};

/**
 * Envia um alerta de enchente para a API
 */
export async function sendFloodAlert(alert: FloodAlert): Promise<{ ok: boolean; alertId?: string; error?: string }> {
  try {
    const response = await fetch('/api/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alert),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send alert');
    }

    const data = await response.json();
    return { ok: true, alertId: data.alertId };
  } catch (error) {
    console.error('Error sending flood alert:', error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Busca alertas da API
 */
export async function fetchAlerts(): Promise<FloodAlert[]> {
  try {
    const response = await fetch('/api/alerts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }

    const data = await response.json();
    return data.alerts || [];
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
}

/**
 * Converte um FloodAlert para o formato de Notification usado no app
 */
export function convertFloodAlertToNotification(floodAlert: FloodAlert, id: string) {
  return {
    id,
    type: impactToAlertType[floodAlert.impact],
    level: riskLevelToAlertLevel[floodAlert.riskLevel] || floodAlert.alertLevel,
    title: floodAlert.text,
    description: floodAlert.rationale,
    location: `Lat: ${floodAlert.region.lat.toFixed(4)}, Lon: ${floodAlert.region.lon.toFixed(4)}`,
    time: formatTimeAgo(floodAlert.issuedAt),
  };
}

/**
 * Formata timestamp para formato relativo (ex: "5 min atrás")
 */
function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'agora';
  if (diffMins === 1) return '1 min atrás';
  if (diffMins < 60) return `${diffMins} min atrás`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hora atrás';
  if (diffHours < 24) return `${diffHours} horas atrás`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 dia atrás';
  return `${diffDays} dias atrás`;
}

/**
 * Exemplo de uso em um componente React:
 * 
 * import { sendFloodAlert } from './services/alertService';
 * 
 * const newAlert: FloodAlert = {
 *   type: 'flood_alert',
 *   version: '1.0',
 *   issuedAt: new Date().toISOString(),
 *   region: { lat: -23.5505, lon: -46.6333 },
 *   riskLevel: 'alto',
 *   alertLevel: 2,
 *   impact: 'transito',
 *   confidence: 0.85,
 *   text: 'Alagamento no Viaduto',
 *   rationale: 'Chuva intensa detectada',
 * };
 * 
 * const result = await sendFloodAlert(newAlert);
 * if (result.ok) {
 *   console.log('Alert sent!', result.alertId);
 * }
 */
