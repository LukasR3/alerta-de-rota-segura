/**
 * Exemplos de uso da API de Alertas de Enchente
 * 
 * Este arquivo contém funções de exemplo e testes
 */

import { FloodAlert } from '../services/alertService';

// ============================================
// EXEMPLOS DE ALERTAS
// ============================================

export const exampleAlerts: FloodAlert[] = [
  // Alerta Nível 1 - Baixo Risco
  {
    type: 'flood_alert',
    version: '1.0',
    issuedAt: new Date().toISOString(),
    region: { lat: -23.5558, lon: -46.6396 }, // Av. Paulista
    riskLevel: 'baixo',
    alertLevel: 1,
    impact: 'fluxo_pessoas',
    confidence: 0.65,
    text: 'Obras na calçada da Av. Paulista',
    rationale: 'Calçada bloqueada na altura do número 1578. Travessia de pedestres sendo realizada pela rua. Previsão de conclusão: 2 dias.',
  },

  // Alerta Nível 2 - Médio Risco
  {
    type: 'flood_alert',
    version: '1.0',
    issuedAt: new Date().toISOString(),
    region: { lat: -23.5505, lon: -46.6333 }, // Viaduto Alcântara Machado
    riskLevel: 'alto',
    alertLevel: 2,
    impact: 'transito',
    confidence: 0.85,
    text: 'Viaduto Alcântara Machado - Alagamento Nível 2',
    rationale: 'Ponto de alagamento intransitável na saída do viaduto em direção ao centro. Água atingiu 30cm de altura. Via completamente bloqueada para veículos. Rota alternativa recomendada pela Av. do Estado.',
  },

  // Alerta Nível 3 - Alto Risco
  {
    type: 'flood_alert',
    version: '1.0',
    issuedAt: new Date().toISOString(),
    region: { lat: -23.5629, lon: -46.6544 }, // Zona Leste
    riskLevel: 'critico',
    alertLevel: 3,
    impact: 'moradias_comercio',
    confidence: 0.92,
    text: 'Alerta Crítico - Granizo e Enchente Severa',
    rationale: 'Previsão de chuva de granizo e enchente severa para a região da Mooca e Tatuapé nas próximas 2 horas. Proteja veículos e imóveis. Nível do rio subindo rapidamente. Possível evacuação necessária.',
  },

  // Alerta com confiança nula (sem modelo de IA)
  {
    type: 'flood_alert',
    version: '1.0',
    issuedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min atrás
    region: { lat: -23.5489, lon: -46.6388 },
    riskLevel: 'moderado',
    alertLevel: 2,
    impact: 'transito',
    confidence: null,
    text: 'Bloqueio temporário - Manifestação',
    rationale: 'Manifestação bloqueia trânsito na Av. Consolação. Reporte manual de cidadão verificado. Sem previsão de término.',
  },
];

// ============================================
// FUNÇÕES DE TESTE
// ============================================

/**
 * Gera um alerta aleatório para testes
 */
export function generateRandomAlert(): FloodAlert {
  const riskLevels: FloodAlert['riskLevel'][] = ['baixo', 'moderado', 'alto', 'critico'];
  const impacts: FloodAlert['impact'][] = ['fluxo_pessoas', 'transito', 'moradias_comercio'];
  const alertLevels: (1 | 2 | 3)[] = [1, 2, 3];

  const lat = -23.5505 + (Math.random() - 0.5) * 0.2; // ±0.1 graus
  const lon = -46.6333 + (Math.random() - 0.5) * 0.2;

  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const impact = impacts[Math.floor(Math.random() * impacts.length)];
  const alertLevel = alertLevels[Math.floor(Math.random() * alertLevels.length)];

  const locations = [
    'Viaduto Alcântara Machado',
    'Av. Paulista',
    'Marginal Tietê',
    'Av. 23 de Maio',
    'Praça da Sé',
    'Parque do Ibirapuera',
  ];

  const location = locations[Math.floor(Math.random() * locations.length)];

  return {
    type: 'flood_alert',
    version: '1.0',
    issuedAt: new Date().toISOString(),
    region: { lat, lon },
    riskLevel,
    alertLevel,
    impact,
    confidence: Math.random() > 0.1 ? Math.random() : null,
    text: `Alerta de ${riskLevel} - ${location}`,
    rationale: `Situação detectada em ${location}. Nível de risco: ${riskLevel}. Impacto esperado: ${impact}.`,
  };
}

/**
 * Simula envio de múltiplos alertas
 */
export async function sendMultipleAlerts(count: number = 3, delayMs: number = 1000) {
  console.log(`📤 Enviando ${count} alertas de teste...`);
  
  for (let i = 0; i < count; i++) {
    const alert = generateRandomAlert();
    
    console.log(`\n🚨 Alerta ${i + 1}/${count}:`);
    console.log('  Nível:', alert.alertLevel);
    console.log('  Risco:', alert.riskLevel);
    console.log('  Impacto:', alert.impact);
    console.log('  Local:', `Lat ${alert.region.lat.toFixed(4)}, Lon ${alert.region.lon.toFixed(4)}`);
    console.log('  Texto:', alert.text);
    
    // Simula envio (descomente quando a API estiver rodando)
    // const result = await sendFloodAlert(alert);
    // console.log('  Resultado:', result.ok ? '✅ Sucesso' : '❌ Erro');
    
    if (i < count - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.log('\n✅ Todos os alertas foram processados!');
}

/**
 * Valida estrutura de um alerta
 */
export function validateAlert(alert: Partial<FloodAlert>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (alert.type !== 'flood_alert') {
    errors.push('type deve ser "flood_alert"');
  }

  if (!alert.version) {
    errors.push('version é obrigatório');
  }

  if (!alert.issuedAt) {
    errors.push('issuedAt é obrigatório');
  } else {
    const date = new Date(alert.issuedAt);
    if (isNaN(date.getTime())) {
      errors.push('issuedAt deve ser um ISO 8601 válido');
    }
  }

  if (!alert.region) {
    errors.push('region é obrigatório');
  } else {
    if (typeof alert.region.lat !== 'number' || alert.region.lat < -90 || alert.region.lat > 90) {
      errors.push('region.lat deve estar entre -90 e 90');
    }
    if (typeof alert.region.lon !== 'number' || alert.region.lon < -180 || alert.region.lon > 180) {
      errors.push('region.lon deve estar entre -180 e 180');
    }
  }

  if (!['baixo', 'moderado', 'alto', 'critico'].includes(alert.riskLevel as string)) {
    errors.push('riskLevel deve ser: baixo, moderado, alto ou critico');
  }

  if (![1, 2, 3].includes(alert.alertLevel as number)) {
    errors.push('alertLevel deve ser 1, 2 ou 3');
  }

  if (!['fluxo_pessoas', 'transito', 'moradias_comercio'].includes(alert.impact as string)) {
    errors.push('impact deve ser: fluxo_pessoas, transito ou moradias_comercio');
  }

  if (alert.confidence !== null && (typeof alert.confidence !== 'number' || alert.confidence < 0 || alert.confidence > 1)) {
    errors.push('confidence deve ser null ou um número entre 0 e 1');
  }

  if (!alert.text || alert.text.trim().length === 0) {
    errors.push('text é obrigatório e não pode ser vazio');
  }

  if (!alert.rationale || alert.rationale.trim().length === 0) {
    errors.push('rationale é obrigatório e não pode ser vazio');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================
// TESTES
// ============================================

/**
 * Executa testes de validação
 */
export function runValidationTests() {
  console.log('🧪 Executando testes de validação...\n');

  // Teste 1: Alerta válido
  const validAlert = exampleAlerts[0];
  const test1 = validateAlert(validAlert);
  console.log('✅ Teste 1 - Alerta válido:', test1.valid ? 'PASSOU' : 'FALHOU');
  if (!test1.valid) console.log('  Erros:', test1.errors);

  // Teste 2: Alerta sem tipo
  const invalidAlert1 = { ...exampleAlerts[0], type: 'wrong_type' as any };
  const test2 = validateAlert(invalidAlert1);
  console.log('✅ Teste 2 - Tipo inválido:', !test2.valid ? 'PASSOU' : 'FALHOU');

  // Teste 3: Coordenadas inválidas
  const invalidAlert2 = { ...exampleAlerts[0], region: { lat: 100, lon: -200 } };
  const test3 = validateAlert(invalidAlert2);
  console.log('✅ Teste 3 - Coordenadas inválidas:', !test3.valid ? 'PASSOU' : 'FALHOU');

  // Teste 4: Alert level inválido
  const invalidAlert3 = { ...exampleAlerts[0], alertLevel: 5 as any };
  const test4 = validateAlert(invalidAlert3);
  console.log('✅ Teste 4 - Alert level inválido:', !test4.valid ? 'PASSOU' : 'FALHOU');

  console.log('\n✅ Testes concluídos!');
}

// ============================================
// EXEMPLOS DE USO NO CONSOLE
// ============================================

/**
 * Exemplo 1: Testar validação
 * runValidationTests();
 * 
 * Exemplo 2: Gerar alerta aleatório
 * const randomAlert = generateRandomAlert();
 * console.log(randomAlert);
 * 
 * Exemplo 3: Validar alerta específico
 * const validation = validateAlert(exampleAlerts[1]);
 * console.log(validation);
 * 
 * Exemplo 4: Simular envio de alertas
 * await sendMultipleAlerts(5, 2000); // 5 alertas com 2s de delay
 */
