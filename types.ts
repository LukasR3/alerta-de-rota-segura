
export enum AlertType {
  A = 'A', // Pedestres
  B = 'B', // Automóveis
  C = 'C', // Imóveis
}

export enum AlertLevel {
  LEVEL_1 = 1, // Amarelo - Baixo risco
  LEVEL_2 = 2, // Laranja - Médio risco
  LEVEL_3 = 3, // Vermelho - Alto risco
}

export interface Notification {
  id: string;
  type: AlertType;
  level: AlertLevel;
  title: string;
  description: string;
  location: string;
  time: string;
}
