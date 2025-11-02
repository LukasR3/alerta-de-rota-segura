# 🚨 Alerta de Rota Segura

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?logo=vite)

**Um protótipo de aplicativo móvel inteligente para visualizar rotas seguras e receber alertas de alagamento em tempo real**

[🎥 Ver Demo](#-demonstração) • [🚀 Instalação](#-instalação-e-execução) • [📖 Documentação](#-como-usar)

</div>

---

## 📋 Sobre o Projeto

O **Alerta de Rota Segura** é um protótipo de aplicação móvel desenvolvido para demonstrar como pedestres, motoristas e moradores podem navegar com segurança pela cidade, recebendo alertas em tempo real sobre alagamentos, obras e outros riscos que podem afetar sua rota.

### 🎯 Objetivo

Simular uma experiência completa de usuário desde a **tela inicial do smartphone** até a **visualização interativa de alertas** em um mapa detalhado, demonstrando:
- Chegada de notificação push na tela inicial
- Abertura do aplicativo ao tocar na notificação
- Navegação entre telas (Mapa e Alertas)
- Interação com marcadores no mapa
- Visualização de detalhes dos alertas

### 📊 Sistema de Categorização

**Por Tipo de Afetação:**
- 🚶 **Tipo A**: Alertas para Pedestres (obras na calçada, bloqueios de passagem)
- 🚗 **Tipo B**: Alertas para Automóveis (alagamentos, vias intransitáveis)
- 🏠 **Tipo C**: Alertas para Imóveis (granizo, riscos estruturais)

**Por Nível de Gravidade:**
- 🟡 **Nível 1 (Amarelo)**: Baixo risco - Atenção recomendada
- 🟠 **Nível 2 (Laranja)**: Médio risco - Cuidado necessário
- 🔴 **Nível 3 (Vermelho)**: Alto risco - Perigo iminente

### ✨ Funcionalidades Principais

#### 🏠 Tela Inicial (Home Screen)
- ⏰ Relógio e data em tempo real
- 🎨 Wallpaper gradiente personalizado
- � Ícones de aplicativos decorativos
- ⏱️ **Notificação animada com delay de 4 segundos**
- 🎬 Animação de entrada suave (slide-down)
- 👆 Interação por toque para abrir o app

#### 🗺️ Mapa Interativo
- 🎨 **Design realista** com múltiplas camadas visuais
- 🏙️ Representação de edifícios, quarteirões e áreas verdes
- 🌊 Rio Tietê com gradiente realista
- 🛣️ Avenidas principais nomeadas (Av. Paulista, Av. Alcântara Machado)
- 📍 Labels de bairros (Mooca, Cerqueira César)
- 🚶 Rota animada com efeito de movimento
- ⚠️ **Marcadores clicáveis** com tooltips informativos
- 📌 Indicador "Você está aqui" pulsante
- 🎯 Pontos de partida e chegada bem definidos

#### 📋 Painel de Informações
- ⚠️ Banner de alerta pulsante no topo
- ⏰ Tempo estimado de chegada
- 📏 Distância total da rota
- 🚦 Status do trânsito em tempo real
- ⏱️ Indicação de atrasos
- 🔄 Botão para rotas alternativas

#### 🔔 Central de Alertas
- 📍 Alertas ordenados por proximidade
- 🎨 Cards expansíveis com detalhes completos
- 🏷️ Badges de nível de gravidade
- 🕒 Timestamps relativos (agora, há 10min, etc.)
- 📍 Distância do usuário
- 🎯 Destaque para alertas de alto risco

#### 📱 Design de Hardware Realista
- 📐 Dimensões: 375x812px (iPhone X/11/12)
- 🎨 Corpo do celular com gradiente realista
- 🔘 Botões físicos laterais (Power, Volume, Silencioso)
- 📷 Notch com câmera e speaker
- ✨ Reflexos e sombras 3D
- 🌑 Fundo escuro para apresentação profissional

---

## 🎯 Demonstração

### 🎬 Fluxo de Uso

1. **Tela Inicial** 
   - Usuário visualiza a tela inicial do smartphone
   - Após 4 segundos, notificação de enchente (Nível 2) aparece
   - Notificação desliza de cima com animação suave

2. **Abertura do App**
   - Usuário toca na notificação
   - App abre diretamente na Central de Alertas
   - Alerta de enchente aparece em destaque no topo

3. **Navegação no Mapa**
   - Usuário navega para a tela do Mapa
   - Visualiza rota de Mooca até Av. Paulista
   - Clica nos marcadores laranjas/amarelos para ver detalhes
   - Tooltips aparecem com informações completas

4. **Retorno à Home**
   - Botão no header permite voltar à tela inicial
   - Simula fechamento do app
   - Notificação reaparece após 4 segundos

### 🗺️ Mapa Detalhado
```
Características do Mapa:
├── Fundo com grid e padrões de edifícios
├── Rio Tietê com gradiente azul
├── Ruas principais iluminadas
├── Quarteirões representados
├── Áreas verdes (parques)
├── Rota animada em azul
├── 2 alertas interativos
├── Posição atual do usuário
└── Painel de informações na base
```

### 📊 Exemplos de Alertas

**Alerta Nível 2 - Viaduto Alcântara Machado**
- Tipo: Automóveis (B)
- Cor: Laranja 🟠
- Localização: 500m do usuário
- Status: Via intransitável
- Tempo: Agora

**Alerta Nível 1 - Obras na Av. Paulista**
- Tipo: Pedestres (A)
- Cor: Amarelo 🟡
- Localização: 2.5km do usuário
- Status: Calçada bloqueada
- Tempo: 10 min atrás

**Alerta Nível 3 - Granizo Zona Leste**
- Tipo: Imóveis (C)
- Cor: Vermelho 🔴
- Localização: 5km do usuário
- Status: Previsão confirmada
- Tempo: 35 min atrás

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)** (v19.2.0) - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (v5.8.2) - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** (v4.5.0) - Build tool moderna e rápida
- **SVG** - Gráficos vetoriais escaláveis para mapas e ícones
- **CSS3** - Animações, gradientes e efeitos visuais
- **React Hooks** - useState, useEffect, useCallback para gerenciamento de estado

---

## 📦 Estrutura do Projeto

```
alerta-de-rota-segura/
├── components/
│   ├── BottomNav.tsx          # Navegação inferior (Mapa/Alertas)
│   ├── HomeScreen.tsx         # Tela inicial do smartphone
│   ├── Icons.tsx              # Biblioteca de ícones SVG
│   ├── MapView.tsx            # Mapa interativo com alertas
│   ├── NotificationCard.tsx   # Card individual de notificação
│   ├── NotificationsView.tsx  # Lista completa de alertas
│   ├── RouteInfoPanel.tsx     # Painel de informações da rota
│   └── StatusBar.tsx          # Barra de status do dispositivo
├── App.tsx                    # Componente raiz e navegação
├── types.ts                   # Definições TypeScript (AlertType, AlertLevel, Notification)
├── index.tsx                  # Ponto de entrada React
├── index.html                 # HTML base
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração TypeScript
├── package.json              # Dependências e scripts
└── metadata.json             # Metadados do aplicativo
```

---

## 🛠️ Instalação e Execução

### Pré-requisitos

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**

### Passos para Instalação

1. **Clone o repositório** (ou baixe o projeto):
```bash
git clone <url-do-repositorio>
cd alerta-de-rota-segura
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**:
```bash
npm run dev
```

4. **Acesse no navegador**:
   - O aplicativo estará disponível em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção localmente

---

## 💡 Como Usar

1. **Navegação**: Use os botões na parte inferior para alternar entre as telas de Mapa e Alertas
2. **Visualize a Rota**: Na tela do mapa, veja sua rota traçada com alertas marcados
3. **Confira Alertas**: Acesse a Central de Alertas para ver detalhes de cada ocorrência
4. **Identifique Riscos**: Alertas são codificados por cor e ícone:
   - 🔴 Vermelho (Veículos) - Alagamentos e vias intransitáveis
   - 🟠 Laranja (Pedestres) - Obras e bloqueios de calçada
   - 🟣 Roxo (Imóveis) - Granizo e riscos estruturais

---

## 🎨 Design e Interface

O aplicativo simula um smartphone moderno com:
- Dimensões: 375x812px (padrão iPhone)
- Borda arredondada e notch superior
- Status bar realista
- Navegação por abas na parte inferior
- Animações suaves e pulsantes

---

## 🔮 Funcionalidades Futuras

- [ ] Integração com API real de dados de trânsito
- [ ] Notificações push em tempo real
- [ ] Cálculo automático de rotas alternativas
- [ ] Histórico de alertas
- [ ] Modo noturno/escuro
- [ ] Compartilhamento de alertas entre usuários
- [ ] Integração com mapas do Google/OpenStreetMap
- [ ] Suporte a múltiplos idiomas

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para tornar as rotas urbanas mais seguras.

---

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma [issue](../../issues) no repositório.

---

<div align="center">

**[⬆ Voltar ao topo](#-alerta-de-rota-segura)**

</div>
