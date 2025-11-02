# 🪝 GUIA DE INTEGRAÇÃO COM WEBHOOK.SITE

## 📋 Visão Geral

Este guia explica como usar o **webhook.site** como intermediário para receber alertas do n8n e enviá-los para sua aplicação local.

### 🎯 Fluxo de Dados
```
n8n → webhook.site → webhook-bridge.js → server.js → React App
```

---

## 🚀 PASSO A PASSO

### 1️⃣ Configurar Webhook.site

1. Acesse https://webhook.site
2. Você verá uma URL única, algo como:
   ```
   https://webhook.site/abc123def-456-789-ghi-jklmnopqrst
   ```
3. **Copie o TOKEN** (a parte depois de `/`, ex: `abc123def-456-789-ghi-jklmnopqrst`)

---

### 2️⃣ Configurar Variável de Ambiente

**Opção A: Via Terminal (temporário)**
```powershell
$env:WEBHOOK_TOKEN="abc123def-456-789-ghi-jklmnopqrst"
```

**Opção B: Criar arquivo `.env` (recomendado)**
```bash
# .env
WEBHOOK_TOKEN=abc123def-456-789-ghi-jklmnopqrst
```

---

### 3️⃣ Instalar Dependência

```bash
npm install
```

---

### 4️⃣ Configurar n8n

No seu workflow do n8n:

1. **Adicione um nó HTTP Request**
2. Configure:
   - **Method**: `POST`
   - **URL**: `https://webhook.site/SEU_TOKEN_AQUI`
   - **Body Content Type**: `JSON`
   - **Body**: 
   ```json
   {
     "region": {
       "startCoord": { "lat": -23.5505, "lon": -46.6333 },
       "endCoord": { "lat": -23.5605, "lon": -46.6433 }
     },
     "riskLevel": 2,
     "confidence": 0.85,
     "impact": "B",
     "rationale": "Alagamento detectado na Av. Paulista"
   }
   ```

---

### 5️⃣ Iniciar a Aplicação

**Opção A: Tudo de uma vez**
```bash
npm run start:webhook
```

Isso inicia:
- ✅ Vite (Frontend) na porta 3000
- ✅ Express (API) na porta 3001
- ✅ Webhook Bridge (Ponte)

**Opção B: Separadamente (para debug)**

Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run server
```

Terminal 3:
```bash
npm run bridge
```

---

## 🔍 Verificando se Está Funcionando

### ✅ Checklist

1. **Vite rodando**: Acesse http://localhost:3000
2. **Express rodando**: Acesse http://localhost:3001/health
3. **Bridge rodando**: Você verá no terminal:
   ```
   🌉 PONTE WEBHOOK.SITE INICIADA
   📡 Webhook.site Token: abc123def...
   ⏳ Aguardando alertas do n8n via webhook.site...
   ```

### 🧪 Testar Envio Manual

1. Acesse https://webhook.site/#!/SEU_TOKEN
2. Clique em "Edit" → "Send Request"
3. Cole o JSON de exemplo (do passo 4)
4. Clique "Send"
5. Em ~5 segundos, você verá no terminal do bridge:
   ```
   📨 Novo alerta processado: { id: 'abc12345', riskLevel: 2, impact: 'B' }
   ✅ Alerta enviado para o servidor local: alrt_xyz789
   ```

---

## 📊 Monitoramento

### Ver alertas recebidos pelo webhook.site
- Acesse: https://webhook.site/#!/SEU_TOKEN

### Ver alertas no servidor local
- Acesse: http://localhost:3001/api/alerts

### Ver no frontend
- Acesse: http://localhost:3000
- Clique no ícone de notificação para ver alertas

---

## 🐛 Troubleshooting

### ❌ "Webhook.site Token: SEU_TOKEN_AQUI"
**Problema**: Você não configurou a variável de ambiente

**Solução**:
```powershell
$env:WEBHOOK_TOKEN="seu-token-real-aqui"
npm run bridge
```

---

### ❌ "Erro ao buscar webhook.site: HTTP 404"
**Problema**: Token inválido ou expirado

**Solução**:
1. Acesse https://webhook.site novamente
2. Copie o novo token
3. Atualize a variável de ambiente

---

### ❌ "Erro ao enviar para servidor local"
**Problema**: O servidor Express não está rodando

**Solução**:
```bash
npm run server
```

---

### ❌ Webhook.site não mostra os requests do n8n
**Problema**: URL incorreta no n8n

**Solução**:
1. Verifique se a URL no n8n está exatamente: `https://webhook.site/SEU_TOKEN`
2. Sem `/` no final
3. Sem espaços extras

---

## 💡 Dicas

### ⏱️ Ajustar Frequência de Verificação

Edite `webhook-bridge.js`:
```javascript
const POLL_INTERVAL = 3000; // 3 segundos (mais rápido)
// ou
const POLL_INTERVAL = 10000; // 10 segundos (menos requests)
```

### 🗑️ Limpar Alertas Antigos

O webhook.site mantém os últimos 100 requests. Para resetar:
1. Acesse https://webhook.site/#!/SEU_TOKEN
2. Clique em "Delete all"

### 📝 Ver Logs Detalhados

O bridge mostra automaticamente:
- ✅ Alertas processados com sucesso
- ⚠️ Requests ignorados (não JSON ou sem estrutura correta)
- ❌ Erros de conexão

---

## 🎓 Estrutura do Alerta

O n8n deve enviar JSON neste formato:

```typescript
{
  region: {
    startCoord: { lat: number, lon: number },
    endCoord: { lat: number, lon: number }
  },
  riskLevel: 1 | 2 | 3,  // 1=Baixo, 2=Moderado/Alto, 3=Crítico
  confidence: number,     // 0.0 a 1.0
  impact: "A" | "B" | "C", // A=Pedestres, B=Automóveis, C=Imóveis
  rationale: string
}
```

---

## ✨ Próximos Passos

Depois de testar com webhook.site:

1. **Produção**: Trocar webhook.site por API real
2. **WebSockets**: Para alertas em tempo real sem polling
3. **Banco de Dados**: Persistir alertas (MongoDB, PostgreSQL)
4. **Autenticação**: Proteger endpoints com API keys

---

## 📞 Suporte

Se algo não funcionar:
1. Verifique os logs de todos os terminais
2. Teste o health endpoint: http://localhost:3001/health
3. Verifique se o webhook.site está recebendo: https://webhook.site/#!/SEU_TOKEN

---

**Feito com ❤️ para testes rápidos de integração n8n**
