// API Route para receber alertas de enchente
// Nota: Este projeto usa Vite, não Next.js
// Para usar esta API, considere migrar para Next.js ou usar um backend separado

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

// Simulação de endpoint POST para Next.js
// Para usar em produção, migre para Next.js ou crie um backend Express/Fastify
export async function POST(req: Request) {
  let body: FloodAlert;
  
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Validação básica
  if (!body.type || body.type !== 'flood_alert') {
    return new Response(
      JSON.stringify({ error: 'Invalid alert type' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  if (!body.alertLevel || ![1, 2, 3].includes(body.alertLevel)) {
    return new Response(
      JSON.stringify({ error: 'Alert level must be 1, 2, or 3' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // TODO: salvar em DB ou repassar p/ front via SSE/WebSocket/Firestore
  console.log('🚨 ALERTA DE ENCHENTE RECEBIDO:', {
    level: body.alertLevel,
    risk: body.riskLevel,
    region: body.region,
    impact: body.impact,
    timestamp: body.issuedAt,
  });
  
  console.log('📝 Detalhes:', {
    text: body.text,
    rationale: body.rationale,
    confidence: body.confidence,
  });

  // Exemplo de como você poderia processar o alerta
  // processAlert(body);

  return new Response(
    JSON.stringify({ 
      ok: true,
      message: 'Alert received successfully',
      alertId: `alert_${Date.now()}`,
    }), 
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Função helper para processar alertas (exemplo)
function processAlert(alert: FloodAlert): void {
  // Aqui você pode:
  // 1. Salvar no banco de dados
  // 2. Enviar notificação push
  // 3. Atualizar estado global
  // 4. Enviar via WebSocket para clientes conectados
  // 5. Armazenar no Firebase/Supabase
  
  console.log('Processing alert...', alert);
}

// GET endpoint para listar alertas (opcional)
export async function GET(req: Request) {
  // Exemplo de retorno de alertas
  const mockAlerts: FloodAlert[] = [
    {
      type: 'flood_alert',
      version: '1.0',
      issuedAt: new Date().toISOString(),
      region: { lat: -23.5505, lon: -46.6333 },
      riskLevel: 'alto',
      alertLevel: 2,
      impact: 'transito',
      confidence: 0.85,
      text: 'Alagamento detectado no Viaduto Alcântara Machado',
      rationale: 'Chuva intensa nas últimas 2 horas. Nível da água subiu 30cm.',
    },
  ];

  return new Response(
    JSON.stringify({ alerts: mockAlerts }), 
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
