# 🚨 Alerta de Rota Segura

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)

**Um aplicativo móvel inteligente para visualizar rotas seguras e receber alertas de alagamento em tempo real**

</div>

---

## 📋 Sobre o Projeto

O **Alerta de Rota Segura** é uma aplicação móvel desenvolvida para ajudar pedestres, motoristas e moradores a navegarem com segurança pela cidade, recebendo alertas em tempo real sobre alagamentos, obras e outros riscos que podem afetar sua rota.

O aplicativo categoriza alertas em três tipos:
- 🚶 **Tipo A**: Alertas para Pedestres (obras na calçada, bloqueios)
- 🚗 **Tipo B**: Alertas para Automóveis (alagamentos, vias intransitáveis)
- 🏠 **Tipo C**: Alertas para Imóveis (granizo, riscos estruturais)

### ✨ Funcionalidades Principais

- 🗺️ **Visualização de Rota Interativa**: Mapa SVG estilizado com rotas animadas
- 📍 **Localização em Tempo Real**: Acompanhamento da posição atual do usuário
- 🔔 **Central de Alertas**: Notificações categorizadas por tipo e proximidade
- ⚠️ **Alertas de Alto Risco**: Destaque para alertas próximos ao usuário
- 📱 **Interface Mobile**: Design responsivo simulando um smartphone
- 🎨 **UI/UX Moderna**: Interface limpa e intuitiva com ícones personalizados

---

## 🎯 Demonstração

### Tela do Mapa
- Visualização da rota de **Rua da Mooca** até **Av. Paulista**
- Marcadores animados indicando alagamentos e obras
- Indicador pulsante da localização atual
- Painel informativo com detalhes da rota

### Central de Alertas
- Lista de notificações ordenadas por proximidade
- Categorização visual por tipo de alerta
- Informações detalhadas de cada ocorrência
- Timestamps e localização aproximada

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)** (v19.2.0) - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (v5.8.2) - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** (v6.2.0) - Build tool moderna e rápida
- **SVG** - Gráficos vetoriais para mapas e ícones
- **CSS3** - Estilização com Tailwind-like classes
- **Geolocation API** - Acesso à localização do dispositivo

---

## 📦 Estrutura do Projeto

```
alerta-de-rota-segura/
├── components/
│   ├── BottomNav.tsx          # Navegação inferior do app
│   ├── Icons.tsx              # Componentes de ícones SVG
│   ├── MapView.tsx            # Visualização do mapa com rotas
│   ├── NotificationCard.tsx   # Card individual de notificação
│   ├── NotificationsView.tsx  # Lista de alertas/notificações
│   ├── RouteInfoPanel.tsx     # Painel de informações da rota
│   └── StatusBar.tsx          # Barra de status do smartphone
├── App.tsx                    # Componente principal
├── types.ts                   # Definições TypeScript
├── index.tsx                  # Ponto de entrada React
├── index.html                 # HTML base
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração TypeScript
├── package.json              # Dependências e scripts
└── metadata.json             # Metadados do app
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
