# 📡 Integração de API - Resumo Rápido

## ✅ Arquivos Criados

```
alerta-de-rota-segura/
├── api/
│   ├── alerts/
│   │   └── route.ts          # ✅ Endpoint POST/GET (Next.js style)
│   ├── README.md             # ✅ Documentação completa
│   └── examples.ts           # ✅ Exemplos e testes
├── services/
│   └── alertService.ts       # ✅ Cliente HTTP
└── hooks/
    └── useAlerts.ts          # ✅ React Hook
```

## 🚀 Quick Start

### 1. Enviar um Alerta

```typescript
import { sendFloodAlert } from './services/alertService';

const alert = {
  type: 'flood_alert',
  version: '1.0',
  issuedAt: new Date().toISOString(),
  region: { lat: -23.5505, lon: -46.6333 },
  riskLevel: 'alto',
  alertLevel: 2,
  impact: 'transito',
  confidence: 0.85,
  text: 'Alagamento no Viaduto',
  rationale: 'Chuva intensa',
};

await sendFloodAlert(alert);
```

### 2. Usar no React

```typescript
import { useAlerts } from './hooks/useAlerts';

function App() {
  const { alerts, addAlert } = useAlerts();
  // Use alerts no componente
}
```

## 📋 Schema do FloodAlert

| Campo | Tipo | Valores | Obrigatório |
|-------|------|---------|-------------|
| `type` | string | `'flood_alert'` | ✅ |
| `version` | string | `'1.0'` | ✅ |
| `issuedAt` | string | ISO 8601 | ✅ |
| `region.lat` | number | -90 a 90 | ✅ |
| `region.lon` | number | -180 a 180 | ✅ |
| `riskLevel` | string | baixo, moderado, alto, critico | ✅ |
| `alertLevel` | number | 1, 2, 3 | ✅ |
| `impact` | string | fluxo_pessoas, transito, moradias_comercio | ✅ |
| `confidence` | number\|null | 0.0 a 1.0 | ✅ |
| `text` | string | Descrição | ✅ |
| `rationale` | string | Justificativa | ✅ |

## 🎨 Mapeamentos Automáticos

```typescript
// Risk Level → Alert Level (Visual)
'baixo' → Nível 1 (🟡 Amarelo)
'moderado' → Nível 2 (🟠 Laranja)
'alto' → Nível 2 (🟠 Laranja)
'critico' → Nível 3 (🔴 Vermelho)

// Impact → Alert Type
'fluxo_pessoas' → Tipo A (🚶 Pedestres)
'transito' → Tipo B (🚗 Automóveis)
'moradias_comercio' → Tipo C (🏠 Imóveis)
```

## ⚠️ Nota Importante

Este projeto usa **Vite + React**, não Next.js. Para usar a API:

**Opção 1:** Migrar para Next.js
```bash
npm install next@latest
```

**Opção 2:** Backend separado (Express/Fastify)

## 🔧 Próximos Passos

1. [ ] Escolher entre Next.js ou backend separado
2. [ ] Configurar banco de dados
3. [ ] Implementar WebSocket/SSE para tempo real
4. [ ] Adicionar autenticação
5. [ ] Configurar rate limiting
6. [ ] Deploy em produção

## 📚 Documentação Completa

Ver `api/README.md` para documentação detalhada.

## 🧪 Testar Localmente

```typescript
// No console do navegador
import { runValidationTests } from './api/examples';
runValidationTests();
```

---

**Criado em:** Novembro 2025  
**Versão:** 1.0.0
