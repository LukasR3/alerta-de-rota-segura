# 📸 GUIA VISUAL - Configuração n8n + Webhook.site

## 🎯 Objetivo

Enviar alertas de alagamento do n8n para sua aplicação via webhook.site.

---

## 📋 PASSO 1: Obter URL do Webhook.site

### 1.1 Acesse o Site
```
🌐 https://webhook.site
```

### 1.2 Copie sua URL Única
Você verá algo assim:

```
┌─────────────────────────────────────────────┐
│ Your unique URL (and email address)         │
│                                              │
│ https://webhook.site/abc-123-def-456-ghi    │
│                                              │
│ [Copy]  [QR Code]  [Email]                  │
└─────────────────────────────────────────────┘
```

**✅ Copie esta URL completa!**

---

## 📋 PASSO 2: Configurar n8n

### 2.1 Criar/Editar Workflow

1. Abra seu workflow no n8n
2. Adicione ou edite o nó **HTTP Request**

### 2.2 Configuração do Nó HTTP Request

```
┌─────────────────────────────────────┐
│ HTTP Request                         │
├─────────────────────────────────────┤
│                                      │
│ Parameters ▼                         │
│                                      │
│ Method:        [POST ▼]              │
│                                      │
│ URL:           https://webhook.site/│
│                abc-123-def-456-ghi   │
│                                      │
│ Authentication: [None ▼]             │
│                                      │
│ Send Query Parameters: [Off]        │
│                                      │
│ Send Headers: [Off]                  │
│                                      │
│ Send Body: [On]                      │
│                                      │
│ Body Content Type:                   │
│                [JSON ▼]              │
│                                      │
│ Specify Body:  [Using Fields Below ▼]│
│                                      │
└─────────────────────────────────────┘
```

### 2.3 Configurar JSON Body

Clique em **"Add Field"** e configure:

```json
{
  "region": {
    "startCoord": {
      "lat": -23.5505,
      "lon": -46.6333
    },
    "endCoord": {
      "lat": -23.5605,
      "lon": -46.6433
    }
  },
  "riskLevel": 2,
  "confidence": 0.85,
  "impact": "B",
  "rationale": "Alagamento detectado na Av. Paulista região central"
}
```

**OU** use campos dinâmicos do n8n:

```
┌─────────────────────────────────────┐
│ JSON/RAW Parameters                  │
├─────────────────────────────────────┤
│                                      │
│ region.startCoord.lat:               │
│   {{ $json.latitude_inicio }}        │
│                                      │
│ region.startCoord.lon:               │
│   {{ $json.longitude_inicio }}       │
│                                      │
│ region.endCoord.lat:                 │
│   {{ $json.latitude_fim }}           │
│                                      │
│ region.endCoord.lon:                 │
│   {{ $json.longitude_fim }}          │
│                                      │
│ riskLevel:                           │
│   {{ $json.nivel_risco }}            │
│                                      │
│ confidence:                          │
│   {{ $json.confianca }}              │
│                                      │
│ impact:                              │
│   {{ $json.tipo_impacto }}           │
│                                      │
│ rationale:                           │
│   {{ $json.descricao }}              │
│                                      │
└─────────────────────────────────────┘
```

---

## 📋 PASSO 3: Configurar Aplicação Local

### 3.1 Copiar Token do Webhook.site

Da URL `https://webhook.site/abc-123-def-456-ghi`

Copie apenas: **`abc-123-def-456-ghi`**

### 3.2 Configurar Variável de Ambiente

**No PowerShell:**
```powershell
$env:WEBHOOK_TOKEN="abc-123-def-456-ghi"
```

**No CMD:**
```cmd
set WEBHOOK_TOKEN=abc-123-def-456-ghi
```

**No Bash/Linux:**
```bash
export WEBHOOK_TOKEN="abc-123-def-456-ghi"
```

### 3.3 Iniciar Aplicação

```bash
npm run start:webhook
```

Você verá:
```
============================================================
🌉 PONTE WEBHOOK.SITE INICIADA
============================================================
📡 Webhook.site Token: abc-123-def-456-ghi
🎯 Servidor local: http://localhost:3001/api/alerts
⏱️  Intervalo de verificação: 5000ms
============================================================

⏳ Aguardando alertas do n8n via webhook.site...
```

---

## 📋 PASSO 4: Testar o Fluxo

### 4.1 Execute o Workflow no n8n

Clique em **"Execute Workflow"** ou **"Execute step"**

### 4.2 Verifique no Webhook.site

Acesse: `https://webhook.site/#!/abc-123-def-456-ghi`

Você verá:
```
┌─────────────────────────────────────────────┐
│ Latest Request                               │
│ POST / HTTP/1.1                              │
│ Just now                                     │
│                                              │
│ {                                            │
│   "region": {                                │
│     "startCoord": {"lat":-23.5505,"lon":...} │
│   },                                         │
│   "riskLevel": 2,                            │
│   ...                                        │
│ }                                            │
└─────────────────────────────────────────────┘
```

### 4.3 Aguarde Sincronização (~5 segundos)

O webhook-bridge verifica a cada 5 segundos.

### 4.4 Verifique no Terminal

Você verá:
```
📨 Novo alerta processado: {
  id: 'abc12345',
  riskLevel: 2,
  impact: 'B',
  timestamp: '02/11/2025, 14:30:00'
}
✅ Alerta enviado para o servidor local: alrt_xyz789

🎉 1 novo(s) alerta(s) processado(s)!
```

### 4.5 Verifique no Frontend

1. Acesse `http://localhost:3000`
2. Aguarde 4 segundos para a notificação aparecer
3. Clique na notificação
4. Veja o alerta na Central de Alertas!

---

## ✅ Checklist de Verificação

- [ ] Webhook.site aberto e URL copiada
- [ ] n8n configurado com a URL completa
- [ ] Token configurado na variável de ambiente
- [ ] `npm run start:webhook` executado
- [ ] Workflow do n8n executado
- [ ] Request apareceu no webhook.site
- [ ] Alerta processado apareceu no terminal
- [ ] Notificação apareceu no frontend

---

## 🎓 Valores Aceitos

### riskLevel (Nível de Risco)
```
1 = 🟡 Amarelo (Baixo)
2 = 🟠 Laranja (Moderado/Alto)
3 = 🔴 Vermelho (Crítico)
```

### impact (Tipo de Impacto)
```
"A" = 🚶 Pedestres
"B" = 🚗 Automóveis
"C" = 🏠 Imóveis
```

### confidence (Confiança)
```
0.0 a 1.0
Exemplo: 0.85 = 85% de confiança
```

### Coordenadas
```javascript
// São Paulo - Centro
lat: -23.5505
lon: -46.6333

// São Paulo - Av. Paulista
lat: -23.5629
lon: -46.6544

// São Paulo - Marginal Tietê
lat: -23.5215
lon: -46.6361
```

---

## 🐛 Troubleshooting

### ❌ n8n: "Execution failed"
**Problema**: URL do webhook.site incorreta

**Solução**: 
- Verifique se copiou a URL COMPLETA
- Não adicione `/` no final
- Deve começar com `https://`

---

### ❌ Bridge: "Erro ao buscar webhook.site: HTTP 404"
**Problema**: Token inválido ou expirado

**Solução**:
1. Acesse webhook.site novamente
2. Copie o NOVO token
3. Atualize a variável `$env:WEBHOOK_TOKEN`
4. Reinicie `npm run bridge`

---

### ❌ "Request não é JSON válido"
**Problema**: n8n enviou dados em formato incorreto

**Solução**:
- Em **Body Content Type**, selecione **JSON**
- Em **Specify Body**, use **Using Fields Below** ou **JSON/RAW**
- Valide o JSON em https://jsonlint.com

---

### ❌ "Request sem estrutura FloodAlert"
**Problema**: JSON não tem os campos obrigatórios

**Solução**: Certifique-se de enviar:
```json
{
  "region": { ... },      // ✅ Obrigatório
  "riskLevel": 1,         // ✅ Obrigatório
  "confidence": 0.8,      // ✅ Obrigatório
  "impact": "B",          // ✅ Obrigatório
  "rationale": "..."      // ✅ Obrigatório
}
```

---

## 📞 Links Úteis

- **Webhook.site**: https://webhook.site
- **n8n Docs**: https://docs.n8n.io
- **Documentação Completa**: [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md)
- **Quick Start**: [QUICKSTART_WEBHOOK.md](./QUICKSTART_WEBHOOK.md)

---

**🎉 Pronto! Agora você está recebendo alertas do n8n na sua aplicação!**
