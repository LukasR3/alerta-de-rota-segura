# 🌐 Expor Servidor Local com ngrok

## Por que usar ngrok?

- ✅ Funciona com n8n em qualquer lugar (local, Docker, nuvem)
- ✅ Não precisa se preocupar com firewall/IP
- ✅ Gera URL HTTPS automática
- ✅ 100% confiável

## 📥 Passo 1: Instalar ngrok

### Opção A: Download Direto
1. Acesse: https://ngrok.com/download
2. Baixe a versão para Windows
3. Extraia o `ngrok.exe`

### Opção B: Com Chocolatey
```powershell
choco install ngrok
```

### Opção C: Com Scoop
```powershell
scoop install ngrok
```

## 🚀 Passo 2: Criar Conta (Grátis)

1. Acesse: https://dashboard.ngrok.com/signup
2. Crie uma conta gratuita
3. Copie seu **authtoken** do dashboard

## 🔑 Passo 3: Configurar Token

```powershell
ngrok authtoken SEU_TOKEN_AQUI
```

## ▶️ Passo 4: Executar

### Terminal 1 - Servidor
```powershell
npm run server
```

### Terminal 2 - ngrok
```powershell
ngrok http 3001
```

Você verá algo assim:
```
Session Status                online
Account                       seu-email@example.com
Forwarding                    https://abc123.ngrok.io -> http://localhost:3001
```

## 📋 Passo 5: Usar no n8n

**Copie a URL do Forwarding:**
```
https://abc123.ngrok.io
```

**Use no n8n:**
```
https://abc123.ngrok.io/api/alerts
```

## ✅ Pronto!

Agora o n8n conseguirá se conectar de qualquer lugar! 🎉

---

## 🆓 Limitações do Plano Gratuito

- ✅ Funciona perfeitamente
- ⚠️ URL muda toda vez que reinicia o ngrok
- ⚠️ 40 conexões simultâneas
- ⚠️ Expira após 2 horas de inatividade

**Para URL fixa:** Upgrade para o plano pago ($8/mês)

---

## 🔄 Alternativas ao ngrok

### 1. LocalTunnel (Grátis, sem cadastro)
```powershell
npm install -g localtunnel
lt --port 3001
```

URL gerada: `https://random-name.loca.lt`

### 2. Serveo (SSH Tunnel)
```powershell
ssh -R 80:localhost:3001 serveo.net
```

### 3. Cloudflare Tunnel (Grátis)
```powershell
cloudflared tunnel --url http://localhost:3001
```

---

## 🐛 Troubleshooting

### ngrok não abre
- Verifique o firewall do Windows
- Execute como Administrador

### Erro "failed to listen on port"
- A porta 3001 está ocupada
- Mude para outra porta no `server.js`

### URL não funciona no n8n
- Verifique se copiou a URL HTTPS completa
- Teste primeiro no navegador

---

## 📊 Monitorar Requisições

O ngrok tem um dashboard local:
```
http://localhost:4040
```

Lá você vê:
- Todas as requisições recebidas
- Headers
- Body
- Respostas
- Tempo de cada request

**Super útil para debug!** 🔍
