# 🚨 Alerta de Rota Segura

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?logo=vite)

**Um protótipo de aplicativo móvel inteligente para visualizar rotas seguras e receber alertas de alagamento em tempo real**

</div>

---

## 📋 Integrantes

Lucas Rosa da Silva - lucas.rosa2003@gmail.com
Gustavo Gomes Marcandes - gustavodmarcondes@gmail.com
João Manuel Ferreira Ferreira - jaofferreira@gmail.com
Pedro Vinicius dos Anjos Souza - pedrovasouza@gmail.com

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

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** ou **yarn**
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Passos de Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/LukasR3/alerta-de-rota-segura.git
cd alerta-de-rota-segura
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o projeto**:

**OPÇÃO 1: Modo Demo (Somente Frontend)**
```bash
npm run dev
```
Acesse: `http://localhost:3000`

**OPÇÃO 2: Com API Local (Backend + Frontend)**
```bash
npm run start:all
```
- Frontend: `http://localhost:3000`
- API: `http://localhost:3001`

**OPÇÃO 3: Com Integração n8n via Webhook.site** ⭐
```bash
# 1. Configure o token do webhook.site
$env:WEBHOOK_TOKEN="seu-token-aqui"

# 2. Inicie tudo (Frontend + API + Bridge)
npm run start:webhook
```
📖 Ver guia completo: [QUICKSTART_WEBHOOK.md](./QUICKSTART_WEBHOOK.md)

### Scripts Disponíveis

```bash
npm run dev          # Frontend (porta 3000)
npm run build        # Build de produção
npm run preview      # Preview do build
npm run server       # API Express (porta 3001)
npm run bridge       # Ponte webhook.site
npm run start:all    # Frontend + API
npm run start:webhook # Tudo (Frontend + API + Bridge)
```

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

- **Node.js** (v16 ou superior) - [Download](https://nodejs.org/)
- **npm** (incluído com Node.js) ou **yarn**
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Passos para Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/LukasR3/alerta-de-rota-segura.git
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
   - Abra `http://localhost:3000` (ou a porta indicada no terminal)
   - A aplicação será carregada automaticamente

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com hot-reload
npm run build    # Cria build de produção otimizado
npm run preview  # Visualiza o build de produção localmente
```

### � Solução de Problemas

**Erro de versão do Node.js:**
```bash
# Verifique sua versão do Node.js
node --version

# Se for inferior a v16, atualize em nodejs.org
```

**Porta já em uso:**
```bash
# O Vite tentará usar a próxima porta disponível automaticamente
# Ou você pode especificar uma porta:
npm run dev -- --port 3001
```

---

## 💡 Como Usar

### 🎬 Experiência Completa

1. **Inicie a Aplicação**
   - Acesse `http://localhost:3000`
   - Aguarde a tela inicial carregar

2. **Aguarde a Notificação**
   - Após 4 segundos, uma notificação de alerta aparecerá
   - Notificação: "🟠 Alerta de Enchente - Nível 2"
   - Localização: Viaduto Alcântara Machado

3. **Abra o Aplicativo**
   - Clique/toque na notificação
   - O app abrirá na Central de Alertas
   - Visualize o alerta destacado no topo

4. **Navegue pelo App**
   - Use os botões inferiores para alternar entre:
     - 🗺️ **Mapa de Rota**: Visualização geográfica
     - 🔔 **Central de Alertas**: Lista completa

5. **Interaja com o Mapa**
   - Clique nos marcadores coloridos
   - Veja tooltips com detalhes dos alertas
   - Observe a rota animada
   - Confira o painel de informações

6. **Explore os Alertas**
   - Clique em qualquer card para expandir
   - Veja descrição completa
   - Confira localização e tempo
   - Identifique o nível de gravidade

7. **Volte à Tela Inicial**
   - Clique no ícone 🏠 no header
   - Retorne à home screen
   - Notificação reaparecerá após 4s

### 🎨 Guia Visual de Cores

**Níveis de Alerta:**
- 🟡 **Amarelo** = Nível 1 (Baixo Risco) - Fique atento
- 🟠 **Laranja** = Nível 2 (Médio Risco) - Cuidado necessário  
- 🔴 **Vermelho** = Nível 3 (Alto Risco) - Evite a área

**Tipos de Afetação:**
- 👤 **Ícone de Pessoa** = Afeta Pedestres
- 🚗 **Ícone de Carro** = Afeta Automóveis
- 🏠 **Ícone de Casa** = Afeta Imóveis

### 📍 Localização dos Alertas no Mapa

- **Alerta Laranja (Nível 2)**: Meio da rota - Viaduto alagado
- **Alerta Amarelo (Nível 1)**: Próximo ao destino - Obras na calçada
- **Ponto Verde**: Origem - Rua da Mooca
- **Pin Azul**: Destino - Av. Paulista, 1578
- **Círculo Azul Pulsante**: Sua localização atual

---

## 🎨 Design e Interface

### 📱 Simulação de Dispositivo

O aplicativo simula um **smartphone moderno** com:
- **Modelo**: iPhone X/11/12 style
- **Dimensões**: 375x812px
- **Formato**: Retrato (Portrait)
- **Características físicas**:
  - Notch superior com câmera e speaker
  - Borda arredondada (50px radius)
  - Botões laterais (Power, Volume +/-, Silencioso)
  - Reflexos e sombras realistas
  - Gradiente no corpo do dispositivo

### 🎭 Animações e Transições

- **Slide-down**: Entrada da notificação (4s delay)
- **Pulse**: Efeito pulsante em alertas e localização
- **Dash**: Movimento na linha da rota
- **Hover**: Aumento dos marcadores ao passar o mouse
- **Fade-in**: Abertura dos cards de alerta
- **Scale**: Efeito de pressionar botões

### 🌈 Paleta de Cores

```css
/* Cores Principais */
Brand Blue: #007AFF
Success Green: #34C759
Warning Yellow: #EAB308
Alert Orange: #F97316
Danger Red: #DC2626

/* Gradientes */
Home Screen: from-blue-900 via-purple-900 to-pink-900
Phone Body: from-gray-900 to-black
Map Background: from-gray-700 via-gray-800 to-gray-900
```

---

## 🔮 Melhorias Futuras

### 📱 Funcionalidades
- [ ] Integração com API real de clima e trânsito
- [ ] Geolocalização real do usuário
- [ ] Notificações push nativas
- [ ] Cálculo de rotas alternativas automático
- [ ] Histórico de alertas visualizados
- [ ] Favoritar locais frequentes
- [ ] Compartilhamento de alertas via redes sociais
- [ ] Modo offline com cache
- [ ] Filtros por tipo e nível de alerta

### 🎨 Interface
- [ ] Modo noturno/escuro
- [ ] Temas personalizáveis
- [ ] Suporte a múltiplos idiomas (i18n)
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Gestos touch (swipe, pinch-to-zoom)
- [ ] Animações mais complexas (Framer Motion)
- [ ] Feedback háptico (vibração)

### 🗺️ Mapa
- [ ] Integração com Google Maps / OpenStreetMap
- [ ] Zoom e pan interativos
- [ ] Camadas de informação (trânsito, topografia)
- [ ] Visualização 3D
- [ ] Street View integration
- [ ] Marcadores customizados pelo usuário
- [ ] Rotas para pedestres, ciclistas e motoristas

### 🔔 Alertas
- [ ] Alertas baseados em preferências do usuário
- [ ] Raio de busca configurável
- [ ] Severidade ajustável
- [ ] Fotos e vídeos dos locais
- [ ] Comentários da comunidade
- [ ] Sistema de validação colaborativa
- [ ] Alertas previstos (machine learning)

### 🔐 Backend e Infraestrutura
- [ ] API RESTful com Node.js/Express
- [ ] Banco de dados (MongoDB/PostgreSQL)
- [ ] Autenticação de usuários (JWT)
- [ ] WebSockets para atualizações em tempo real
- [ ] Sistema de cache (Redis)
- [ ] CDN para assets estáticos
- [ ] Deploy em cloud (Vercel/AWS/Azure)
- [ ] Analytics e monitoramento

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este é um projeto open-source e toda ajuda é apreciada.

### Como Contribuir

1. **Fork o projeto**
   ```bash
   # Clique no botão "Fork" no GitHub
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/alerta-de-rota-segura.git
   cd alerta-de-rota-segura
   ```

3. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```

4. **Faça suas alterações**
   - Escreva código limpo e documentado
   - Siga o padrão TypeScript do projeto
   - Adicione comentários quando necessário

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m 'feat: Adiciona MinhaNovaFeature'
   ```

6. **Push para sua branch**
   ```bash
   git push origin feature/MinhaNovaFeature
   ```

7. **Abra um Pull Request**
   - Descreva as mudanças realizadas
   - Adicione screenshots se aplicável
   - Aguarde o review

### 📝 Padrões de Commit

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Tarefas de manutenção

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Isso significa que você pode:

✅ Usar comercialmente  
✅ Modificar  
✅ Distribuir  
✅ Uso privado  

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Lucas R.**

Desenvolvido com ❤️ e ☕ para tornar as rotas urbanas mais seguras.

- GitHub: [@LukasR3](https://github.com/LukasR3)
- Projeto: [alerta-de-rota-segura](https://github.com/LukasR3/alerta-de-rota-segura)

---

## � Agradecimentos

- Comunidade React e TypeScript
- Vite.js pela ferramenta incrível
- Inspiração em apps de navegação modernos
- Todos que contribuírem com o projeto

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão? 

- 🐛 [Reportar Bug](https://github.com/LukasR3/alerta-de-rota-segura/issues/new?labels=bug)
- 💡 [Sugerir Feature](https://github.com/LukasR3/alerta-de-rota-segura/issues/new?labels=enhancement)
- 📧 Entre em contato através do GitHub

---

## 📊 Status do Projeto

```
🟢 Ativo e em desenvolvimento
📅 Última atualização: Novembro 2025
🎯 Próxima release: v1.1.0
```

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

**[⬆ Voltar ao topo](#-alerta-de-rota-segura)**

---

Feito com ❤️ usando React + TypeScript + Vite

</div>
