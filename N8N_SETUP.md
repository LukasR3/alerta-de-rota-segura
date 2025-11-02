# 🔌 Configuração do n8n com o Projeto

## 🎯 URL CORRETA para usar no n8n:

### ✅ Opção 1: Servidor Local (Desenvolvimento)
```
http://localhost:3001/api/alerts
```

### ✅ Opção 2: Webhook.site (Teste Rápido)
```
https://webhook.site/seu-uuid-aqui
```

### ✅ Opção 3: ngrok (Expor localhost)
```
https://seu-subdominio.ngrok.io/api/alerts
```

---

## 📋 Passo a Passo - Configuração Completa

### 1️⃣ Instalar Dependências

```bash
npm install express cors concurrently
```

### 2️⃣ Iniciar o Servidor

```bash
# Opção A: Apenas o servidor de API
npm run server

# Opção B: Frontend + Servidor juntos
npm run start:all
```

Você verá algo como:
```
🚀 SERVIDOR DE ALERTAS INICIADO
📡 URL do servidor: http://localhost:3001
📨 Endpoint POST:   http://localhost:3001/api/alerts
```

### 3️⃣ Configurar o n8n

**No nó "HTTP Request" do n8n:**

| Campo | Valor |
|-------|-------|
| **Method** | POST |
| **URL** | `http://localhost:3001/api/alerts` |
| **Authentication** | None |
| **Send Query Parameters** | OFF |
| **Send Headers** | OFF |
| **Send Body** | ON (✅) |
| **Body Content Type** | Raw |
| **Content Type** | application/json |

**No campo "Body" do n8n, cole:**

```json
{
  "type": "flood_alert",
  "version": "1.0",
  "issuedAt": "{{ $now.toISO() }}",
  "region": {
    "lat": {{ $json.output.lat }},
    "lon": {{ $json.output.lon }}
  },
  "riskLevel": "{{ $json.output.risk_level }}",
  "alertLevel": {{ $json.output.alert_level }},
  "impact": "{{ $json.output.impact }}",
  "confidence": {{ $json.output.confidence }},
  "text": "{{ $json.output.alert_text }}",
  "rationale": "{{ $json.output.rationale }}"
}
```

### 4️⃣ Testar a Conexão

**Teste manual com curl:**

```bash
curl -X POST http://localhost:3001/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Teste no navegador:**
- Abra: http://localhost:3001/health
- Deve retornar: `{"status":"ok", ...}`

### 5️⃣ Ver os Alertas Recebidos

**Listar todos os alertas:**
```
GET http://localhost:3001/api/alerts
```

**No navegador:**
http://localhost:3001/api/alerts

---

## 🌐 Se o n8n estiver em outro computador/servidor

### Opção A: Usar ngrok (Recomendado)

1. **Instale o ngrok:**
   - Download: https://ngrok.com/download

2. **Execute:**
   ```bash
   ngrok http 3001
   ```

3. **Copie a URL gerada:**
   ```
   https://abc123.ngrok.io
   ```

4. **Use no n8n:**
   ```
   https://abc123.ngrok.io/api/alerts
   ```

### Opção B: Usar seu IP local

1. **Descubra seu IP:**
   ```bash
   # Windows
   ipconfig
   
   # Procure por "IPv4 Address"
   # Ex: 192.168.1.100
   ```

2. **Use no n8n:**
   ```
   http://192.168.1.100:3001/api/alerts
   ```

⚠️ **Atenção:** Funciona apenas na mesma rede!

---

## 🔧 Troubleshooting

### Erro: "EADDRINUSE: address already in use"
A porta 3001 já está em uso. Mude a porta no `server.js`:
```javascript
const PORT = 3002; // ou outra porta livre
```

### Erro: "Connection refused" no n8n
- ✅ Verifique se o servidor está rodando (`npm run server`)
- ✅ Confirme a URL: `http://localhost:3001/api/alerts`
- ✅ Se o n8n estiver em outro PC, use ngrok

### Erro: "502 Bad Gateway"
Você está usando a URL errada! Use:
- ❌ NÃO: `https://github.com/LukasR3/alerta-de-rota-segura`
- ✅ SIM: `http://localhost:3001/api/alerts`

### Os dados não aparecem no frontend
O servidor está funcionando como backend separado. Para integrar com o frontend React:

1. **Use o hook `useAlerts`:**
   ```typescript
   import { useAlerts } from './hooks/useAlerts';
   
   const { alerts } = useAlerts({
     enablePolling: true,
     pollingInterval: 5000, // Atualiza a cada 5s
   });
   ```

2. **Atualize o `alertService.ts` para apontar para o servidor:**
   ```typescript
   const API_URL = 'http://localhost:3001';
   ```

---

## 📊 Monitoramento em Tempo Real

### Ver logs do servidor:
Os alertas aparecerão no terminal onde você rodou `npm run server`:

```
🚨 NOVO ALERTA RECEBIDO DO N8N:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Detalhes do Alerta:
  ID: alert_1730556000123_abc123
  Nível: 2 (alto)
  Impacto: transito
  Localização: Lat -23.5505, Lon -46.6333
  Confiança: 85.0%
  Texto: Alagamento no Viaduto
  Justificativa: Chuva intensa detectada
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Total de alertas armazenados: 1
```

---

## 🚀 Deploy em Produção

Para produção, use serviços como:

1. **Vercel** (para Next.js)
2. **Railway** (para Node.js)
3. **Render** (para Node.js)
4. **Heroku** (para Node.js)

Depois use a URL de produção no n8n.

---

## 📝 Resumo Rápido

```bash
# 1. Instalar
npm install express cors concurrently

# 2. Rodar
npm run server

# 3. URL no n8n
http://localhost:3001/api/alerts

# 4. Testar
curl http://localhost:3001/health
```

**Pronto!** 🎉
