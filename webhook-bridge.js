/**
 * 🌉 PONTE WEBHOOK.SITE → APLICAÇÃO
 * 
 * Este script busca os alertas recebidos no webhook.site
 * e os envia para o servidor local da aplicação
 */

import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ⚙️ Ler variáveis do .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let WEBHOOK_SITE_TOKEN = process.env.WEBHOOK_TOKEN;

// Tentar ler do .env.local se não estiver nas variáveis de ambiente
if (!WEBHOOK_SITE_TOKEN || WEBHOOK_SITE_TOKEN === 'SEU_TOKEN_AQUI') {
  try {
    const envPath = join(__dirname, '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/WEBHOOK_TOKEN=["']?([^"'\n]+)["']?/);
    if (match) {
      WEBHOOK_SITE_TOKEN = match[1];
    }
  } catch (error) {
    console.warn('⚠️  Arquivo .env.local não encontrado, usando variável de ambiente');
  }
}

if (!WEBHOOK_SITE_TOKEN || WEBHOOK_SITE_TOKEN === 'SEU_TOKEN_AQUI') {
  console.error('❌ ERRO: WEBHOOK_TOKEN não configurado!');
  console.error('Configure: $env:WEBHOOK_TOKEN="seu-token" ou crie .env.local');
  process.exit(1);
}
const WEBHOOK_API = `https://webhook.site/token/${WEBHOOK_SITE_TOKEN}/requests`;
const LOCAL_API = 'http://localhost:3001/api/alerts';
const POLL_INTERVAL = 5000; // Buscar novos alertas a cada 5 segundos

// 📦 Armazena IDs já processados para evitar duplicatas
const processedIds = new Set();

/**
 * Busca os últimos requests do webhook.site
 */
async function fetchWebhookRequests() {
  try {
    const response = await fetch(WEBHOOK_API, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || []; // Webhook.site retorna { data: [...] }
  } catch (error) {
    console.error('❌ Erro ao buscar webhook.site:', error.message);
    return [];
  }
}

/**
 * Converte formato do n8n para formato FloodAlert
 */
function adaptN8nToFloodAlert(n8nData) {
  // Mapear risk_level para riskLevel numérico
  const riskLevelMap = {
    'baixo': 1,
    'moderado': 2,
    'alto': 2,
    'critico': 3,
    'crítico': 3
  };

  const riskLevel = typeof n8nData.risk_level === 'string' 
    ? (riskLevelMap[n8nData.risk_level.toLowerCase()] || 2)
    : n8nData.riskLevel || 2;

  // Criar coordenadas de região
  const lat = n8nData.region?.lat || -23.5505;
  const lon = n8nData.region?.lon || -46.6333;

  return {
    type: 'flood_alert', // ✅ Campo obrigatório para o servidor
    region: {
      startCoord: { lat, lon },
      endCoord: { 
        lat: lat + 0.01, 
        lon: lon + 0.01 
      },
      lat, // Mantém também no formato antigo
      lon
    },
    riskLevel,
    alertLevel: riskLevel, // Alias para compatibilidade
    confidence: n8nData.confidence || 0.8,
    impact: n8nData.impact || 'B', // Padrão: Automóveis
    text: n8nData.alert_text || n8nData.rationale || 'Alerta de alagamento',
    rationale: n8nData.rationale || n8nData.alert_text || 'Alerta de alagamento detectado'
  };
}

/**
 * Envia alerta para o servidor local
 */
async function sendToLocalServer(alert) {
  try {
    const response = await fetch(LOCAL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alert)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Alerta enviado para o servidor local:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar para servidor local:', error.message);
    throw error;
  }
}

/**
 * Processa novos requests do webhook.site
 */
async function processNewRequests() {
  const requests = await fetchWebhookRequests();
  
  let newAlertsCount = 0;

  for (const request of requests) {
    // Pular se já processamos este request
    if (processedIds.has(request.uuid)) {
      continue;
    }

    // Tentar parsear o conteúdo
    let alertData;
    try {
      alertData = typeof request.content === 'string' 
        ? JSON.parse(request.content)
        : request.content;
      
      // 🔍 DEBUG: Mostrar o que chegou
      console.log('\n🔍 REQUEST RECEBIDO:', request.uuid.slice(0, 8));
      console.log('📦 Conteúdo:', JSON.stringify(alertData, null, 2));
      
    } catch (error) {
      console.warn('⚠️  Request não é JSON válido:', request.uuid);
      processedIds.add(request.uuid);
      continue;
    }

    // Verificar se tem a estrutura de FloodAlert OU formato do n8n
    const hasFloodAlertStructure = alertData.region && alertData.riskLevel;
    const hasN8nStructure = alertData.region && (alertData.risk_level || alertData.riskLevel);
    
    if (hasFloodAlertStructure || hasN8nStructure) {
      try {
        // Adaptar se for formato n8n
        const floodAlert = hasN8nStructure && !hasFloodAlertStructure
          ? adaptN8nToFloodAlert(alertData)
          : alertData;
        
        console.log('📤 Enviando para servidor:', {
          riskLevel: floodAlert.riskLevel,
          impact: floodAlert.impact,
          confidence: floodAlert.confidence
        });
        
        await sendToLocalServer(floodAlert);
        processedIds.add(request.uuid);
        newAlertsCount++;
        
        console.log(`📨 Novo alerta processado:`, {
          id: request.uuid.slice(0, 8),
          riskLevel: alertData.riskLevel,
          impact: alertData.impact,
          timestamp: new Date(request.created_at).toLocaleString('pt-BR')
        });
      } catch (error) {
        console.error('❌ Falha ao processar alerta:', request.uuid);
      }
    } else {
      console.warn('⚠️  Request sem estrutura FloodAlert:', request.uuid);
      processedIds.add(request.uuid);
    }
  }

  if (newAlertsCount > 0) {
    console.log(`\n🎉 ${newAlertsCount} novo(s) alerta(s) processado(s)!\n`);
  }
}

/**
 * Inicia o monitoramento
 */
async function startBridge() {
  console.log('\n============================================================');
  console.log('🌉 PONTE WEBHOOK.SITE INICIADA');
  console.log('============================================================');
  console.log(`📡 Webhook.site Token: ${WEBHOOK_SITE_TOKEN}`);
  console.log(`🎯 Servidor local: ${LOCAL_API}`);
  console.log(`⏱️  Intervalo de verificação: ${POLL_INTERVAL}ms`);
  console.log('============================================================\n');
  console.log('⏳ Aguardando alertas do n8n via webhook.site...\n');

  // Verificação inicial
  await processNewRequests();

  // Polling contínuo
  setInterval(async () => {
    await processNewRequests();
  }, POLL_INTERVAL);
}

// 🚀 Iniciar
startBridge().catch(error => {
  console.error('💥 Erro fatal:', error);
  process.exit(1);
});
