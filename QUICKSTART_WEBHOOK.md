# 🚀 QUICK START - Webhook.site

## 📝 Resumo em 3 Passos

### 1. Pegue seu Token do Webhook.site
```
1. Acesse: https://webhook.site
2. Copie a URL que aparece
3. Extraia apenas o TOKEN (parte depois de webhook.site/)
   
   Exemplo: https://webhook.site/abc-123-def
            Token: abc-123-def
```

### 2. Configure o Token
```powershell
$env:WEBHOOK_TOKEN="abc-123-def"
```

### 3. Inicie Tudo
```bash
npm run start:webhook
```

---

## 🎯 Configurar n8n

No nó HTTP Request do n8n:
- **URL**: `https://webhook.site/abc-123-def` (seu token)
- **Method**: POST
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
  "rationale": "Alagamento na Av. Paulista"
}
```

---

## ✅ Verificar

1. Execute o workflow no n8n
2. Veja no webhook.site: https://webhook.site/#!/abc-123-def
3. Aguarde ~5 segundos
4. Veja o alerta aparecer no terminal do bridge
5. Acesse http://localhost:3000 e veja a notificação!

---

## 🔧 Comandos Úteis

```bash
# Iniciar tudo junto
npm run start:webhook

# OU iniciar separadamente:
npm run dev      # Frontend (porta 3000)
npm run server   # API (porta 3001)
npm run bridge   # Ponte webhook.site
```

---

## 📖 Documentação Completa

Veja `WEBHOOK_SETUP.md` para troubleshooting e detalhes.
