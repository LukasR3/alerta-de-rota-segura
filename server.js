/**
 * Servidor Express simples para receber alertas do n8n
 * 
 * Para rodar:
 * 1. npm install express cors
 * 2. npm run server
 * 3. Use http://localhost:3001/api/alerts no n8n
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Array para armazenar alertas (em produção, use um banco de dados)
let alerts = [];

// ============================================
// ENDPOINT PRINCIPAL - Recebe alertas do n8n
// ============================================
app.post('/api/alerts', (req, res) => {
  console.log('\n🚨 NOVO ALERTA RECEBIDO DO N8N:');
  console.log('━'.repeat(50));
  
  const alert = req.body;
  
  // Validação básica
  if (!alert.type || alert.type !== 'flood_alert') {
    console.error('❌ Erro: Tipo de alerta inválido');
    return res.status(400).json({ 
      error: 'Invalid alert type. Expected "flood_alert"' 
    });
  }

  // Adiciona timestamp se não existir
  if (!alert.issuedAt) {
    alert.issuedAt = new Date().toISOString();
  }

  // Adiciona ID único
  const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  alert.id = alertId;

  // Salva o alerta
  alerts.unshift(alert); // Adiciona no início do array

  // Limita a 100 alertas em memória
  if (alerts.length > 100) {
    alerts = alerts.slice(0, 100);
  }

  // Log detalhado
  console.log('📋 Detalhes do Alerta:');
  console.log('  ID:', alertId);
  console.log('  Nível:', `${alert.alertLevel} (${alert.riskLevel})`);
  console.log('  Impacto:', alert.impact);
  console.log('  Localização:', `Lat ${alert.region?.lat}, Lon ${alert.region?.lon}`);
  console.log('  Confiança:', alert.confidence ? `${(alert.confidence * 100).toFixed(1)}%` : 'N/A');
  console.log('  Texto:', alert.text);
  console.log('  Justificativa:', alert.rationale);
  console.log('━'.repeat(50));
  console.log(`✅ Total de alertas armazenados: ${alerts.length}\n`);

  // TODO: Aqui você pode:
  // 1. Salvar no banco de dados
  // 2. Enviar notificação push
  // 3. Atualizar WebSocket/SSE para clientes conectados
  // 4. Processar com IA
  
  // Resposta de sucesso
  res.status(200).json({ 
    ok: true,
    message: 'Alert received successfully',
    alertId: alertId,
    totalAlerts: alerts.length
  });
});

// ============================================
// ENDPOINT - Lista todos os alertas
// ============================================
app.get('/api/alerts', (req, res) => {
  console.log(`📋 Requisição GET - Retornando ${alerts.length} alertas`);
  
  res.status(200).json({ 
    alerts: alerts,
    total: alerts.length,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ENDPOINT - Busca alerta específico
// ============================================
app.get('/api/alerts/:id', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }
  
  res.status(200).json(alert);
});

// ============================================
// ENDPOINT - Limpa todos os alertas
// ============================================
app.delete('/api/alerts', (req, res) => {
  const count = alerts.length;
  alerts = [];
  
  console.log(`🗑️ Todos os alertas foram removidos (${count} alertas)`);
  
  res.status(200).json({ 
    ok: true,
    message: `${count} alerts cleared` 
  });
});

// ============================================
// ENDPOINT - Health check
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    uptime: process.uptime(),
    alerts: alerts.length,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SERVIDOR DE ALERTAS INICIADO');
  console.log('='.repeat(60));
  console.log(`📡 URL do servidor: http://localhost:${PORT}`);
  console.log(`📨 Endpoint POST:   http://localhost:${PORT}/api/alerts`);
  console.log(`📋 Endpoint GET:    http://localhost:${PORT}/api/alerts`);
  console.log(`💚 Health Check:    http://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log('\n⏳ Aguardando alertas do n8n...\n');
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não tratado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada:', reason);
});
