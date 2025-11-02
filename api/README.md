# 🚨 API de Alertas de Enchente

## 📋 Visão Geral

Este diretório contém a implementação da API para receber e gerenciar alertas de enchente em tempo real.

## ⚠️ Nota Importante

**Este projeto atualmente usa Vite + React, não Next.js**. Os arquivos da API foram criados seguindo o padrão Next.js App Router, mas para usar em produção você tem duas opções:

### Opção 1: Migrar para Next.js (Recomendado)
```bash
# Instalar Next.js
npm install next@latest react@latest react-dom@latest

# Atualizar package.json scripts
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

### Opção 2: Criar Backend Separado
Use Express, Fastify, ou outro framework Node.js para criar uma API REST separada.

## 📁 Estrutura de Arquivos

```
alerta-de-rota-segura/
├── api/
│   └── alerts/
│       └── route.ts          # Endpoint da API (Next.js style)
├── services/
│   └── alertService.ts       # Cliente HTTP e conversores
└── hooks/
    └── useAlerts.ts          # React Hook para gerenciar alertas
```

## 🔌 Endpoints da API

### POST /api/alerts
Recebe um novo alerta de enchente.

**Request Body:**
```typescript
{
  type: 'flood_alert',
  version: '1.0',
  issuedAt: string,              // ISO 8601 timestamp
  region: { 
    lat: number,                 // Latitude
    lon: number                  // Longitude
  },
  riskLevel: 'baixo' | 'moderado' | 'alto' | 'critico',
  alertLevel: 1 | 2 | 3,
  impact: 'fluxo_pessoas' | 'transito' | 'moradias_comercio',
  confidence: number | null,     // 0 a 1
  text: string,                  // Descrição do alerta
  rationale: string              // Justificativa/detalhes
}
```

**Response (Success):**
```json
{
  "ok": true,
  "message": "Alert received successfully",
  "alertId": "alert_1234567890"
}
```

**Response (Error):**
```json
{
  "error": "Invalid JSON"
}
```

### GET /api/alerts
Lista todos os alertas ativos.

**Response:**
```json
{
  "alerts": [
    {
      "type": "flood_alert",
      "version": "1.0",
      "issuedAt": "2025-11-02T10:30:00Z",
      "region": { "lat": -23.5505, "lon": -46.6333 },
      "riskLevel": "alto",
      "alertLevel": 2,
      "impact": "transito",
      "confidence": 0.85,
      "text": "Alagamento no Viaduto",
      "rationale": "Chuva intensa detectada"
    }
  ]
}
```

## 🔧 Como Usar

### 1. Usando o Service diretamente

```typescript
import { sendFloodAlert, FloodAlert } from './services/alertService';

const newAlert: FloodAlert = {
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
};

const result = await sendFloodAlert(newAlert);
if (result.ok) {
  console.log('Alerta enviado!', result.alertId);
}
```

### 2. Usando o React Hook

```typescript
import { useAlerts } from './hooks/useAlerts';

function AlertsComponent() {
  const { 
    alerts, 
    loading, 
    error, 
    addAlert,
    refetch 
  } = useAlerts({
    enablePolling: true,      // Atualiza automaticamente
    pollingInterval: 30000,   // A cada 30 segundos
  });

  const handleAddAlert = async () => {
    const newAlert: FloodAlert = {
      // ... dados do alerta
    };
    
    const success = await addAlert(newAlert);
    if (success) {
      console.log('Alerta adicionado!');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <button onClick={handleAddAlert}>Adicionar Alerta</button>
      <button onClick={refetch}>Atualizar</button>
      {alerts.map(alert => (
        <div key={alert.id}>{alert.title}</div>
      ))}
    </div>
  );
}
```

## 📊 Mapeamentos

### Risk Level → Alert Level
- `baixo` → Nível 1 (🟡 Amarelo)
- `moderado` → Nível 2 (🟠 Laranja)
- `alto` → Nível 2 (🟠 Laranja)
- `critico` → Nível 3 (🔴 Vermelho)

### Impact → Alert Type
- `fluxo_pessoas` → Tipo A (🚶 Pedestres)
- `transito` → Tipo B (🚗 Automóveis)
- `moradias_comercio` → Tipo C (🏠 Imóveis)

## 🔮 Próximos Passos

### Integração com Backend Real

1. **WebSockets** - Para atualizações em tempo real
```typescript
const ws = new WebSocket('ws://localhost:3001/alerts');
ws.onmessage = (event) => {
  const alert = JSON.parse(event.data);
  // Processar novo alerta
};
```

2. **Server-Sent Events (SSE)** - Para stream de alertas
```typescript
const eventSource = new EventSource('/api/alerts/stream');
eventSource.onmessage = (event) => {
  const alert = JSON.parse(event.data);
  // Processar novo alerta
};
```

3. **Firebase Realtime Database**
```typescript
import { onValue, ref } from 'firebase/database';

onValue(ref(db, 'alerts'), (snapshot) => {
  const alerts = snapshot.val();
  // Atualizar estado
});
```

4. **Supabase Realtime**
```typescript
supabase
  .channel('alerts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'alerts' },
    (payload) => {
      // Processar novo alerta
    }
  )
  .subscribe();
```

## 🗄️ Estrutura de Banco de Dados (Exemplo)

### PostgreSQL/MySQL
```sql
CREATE TABLE flood_alerts (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'flood_alert',
  version VARCHAR(10) NOT NULL DEFAULT '1.0',
  issued_at TIMESTAMP NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lon DECIMAL(11, 8) NOT NULL,
  risk_level VARCHAR(20) NOT NULL,
  alert_level INTEGER NOT NULL CHECK (alert_level IN (1, 2, 3)),
  impact VARCHAR(50) NOT NULL,
  confidence DECIMAL(3, 2),
  text TEXT NOT NULL,
  rationale TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB
```javascript
{
  _id: ObjectId,
  type: 'flood_alert',
  version: '1.0',
  issuedAt: ISODate,
  region: {
    lat: Number,
    lon: Number
  },
  riskLevel: String,
  alertLevel: Number,
  impact: String,
  confidence: Number,
  text: String,
  rationale: String,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## 🔐 Segurança

### Autenticação
```typescript
// Adicionar autenticação JWT
const token = req.headers.get('Authorization');
if (!token || !validateToken(token)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Rate Limiting
```typescript
// Limitar requisições
const rateLimit = new RateLimiter(100, 'hour'); // 100 req/hora
if (!rateLimit.check(clientIp)) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

### Validação
```typescript
// Validar dados de entrada com Zod
import { z } from 'zod';

const FloodAlertSchema = z.object({
  type: z.literal('flood_alert'),
  version: z.string(),
  issuedAt: z.string().datetime(),
  region: z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
  }),
  // ...
});
```

## 📝 Exemplo Completo

```typescript
// pages/alerts.tsx (Next.js)
import { useAlerts } from '../hooks/useAlerts';
import { FloodAlert } from '../services/alertService';

export default function AlertsPage() {
  const { alerts, loading, addAlert } = useAlerts({
    enablePolling: true,
    pollingInterval: 10000,
  });

  const simulateNewAlert = async () => {
    const alert: FloodAlert = {
      type: 'flood_alert',
      version: '1.0',
      issuedAt: new Date().toISOString(),
      region: { 
        lat: -23.5505 + (Math.random() - 0.5) * 0.1, 
        lon: -46.6333 + (Math.random() - 0.5) * 0.1 
      },
      riskLevel: ['baixo', 'moderado', 'alto', 'critico'][
        Math.floor(Math.random() * 4)
      ] as FloodAlert['riskLevel'],
      alertLevel: [1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3,
      impact: ['fluxo_pessoas', 'transito', 'moradias_comercio'][
        Math.floor(Math.random() * 3)
      ] as FloodAlert['impact'],
      confidence: Math.random(),
      text: 'Alerta de teste simulado',
      rationale: 'Simulação de alerta para teste do sistema',
    };

    await addAlert(alert);
  };

  return (
    <div>
      <h1>Alertas de Enchente</h1>
      <button onClick={simulateNewAlert}>Simular Novo Alerta</button>
      
      {loading && <p>Carregando...</p>}
      
      <div>
        {alerts.map(alert => (
          <div key={alert.id} style={{ 
            padding: 10, 
            margin: 10, 
            border: '1px solid #ccc' 
          }}>
            <h3>{alert.title}</h3>
            <p>{alert.description}</p>
            <small>{alert.time} - {alert.location}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📚 Recursos Adicionais

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
