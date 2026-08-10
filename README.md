# 📡 Agenda Técnico Inteligente

**PWA de monitoramento e gestão de ordens de serviço para equipes de campo (telecom / fibra óptica).**

Aplicativo mobile-first usado no dia a dia por técnicos e supervisores: cola a agenda, acompanha status em tempo quase real, registra instalações com GPS e consulta histórico em calendário.

<p align="center">
  <a href="https://monitor-liard-eta.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-monitor--liard--eta.vercel.app-blue?style=for-the-badge" alt="Live Demo" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge" alt="PWA" />
  <img src="https://img.shields.io/badge/HTML5_%2B_JS-Vanilla-orange?style=for-the-badge" alt="Vanilla JS" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/demo-agenda-tecnico.gif" alt="Demo animada do Agenda Técnico Inteligente" width="320" />
</p>

<p align="center">
  <em>Demo: login → dashboard → histórico em calendário → gestão de técnicos → agenda por dia</em>
</p>

---

## 🎯 Para que serve?

Em operações de fibra óptica, a agenda do técnico costuma chegar por WhatsApp/Telegram em texto solto. O supervisor não tem visão clara do que cada um está fazendo, e o histórico se perde.

Este app resolve isso:

- **Técnico** cola a agenda no celular, atualiza status (em rota / concluído / não concluído) e registra instalações com GPS.
- **Supervisor / Admin** vê o dashboard com todos os técnicos, filtra por tipo de O.S., abre histórico por calendário e gera relatórios.

Projeto **em uso real** em operação de campo.

---

## 🖼️ Interface

### Login
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/01-login.png" alt="Tela de login" width="280" />
</p>

Acesso por perfil (**master**, **admin** ou **técnico**), com validação de credenciais e sessão persistente.

### Dashboard de monitoramento
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/02-dashboard.png" alt="Dashboard mobile" width="280" />
  &nbsp;
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/06-dashboard-desktop.png" alt="Dashboard desktop" width="480" />
</p>

Resumo geral com gráfico donut, filtros por tipo de serviço (instalação, LOS, lentidão…) e cards por técnico com status quase em tempo real.

### Histórico geral (calendário)
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/03-historico-calendario.png" alt="Histórico em calendário" width="280" />
</p>

Calendário mensal em que **dias com agendamento** aparecem com **indicador verde**. Toque no dia para ver instalações, O.S. em rota, concluídas e não concluídas.

### Gestão de técnicos
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/04-gerenciar-tecnicos.png" alt="Gerenciar técnicos" width="280" />
</p>

Cadastro, senhas, abertura de agenda, relatórios e atalhos de histórico/instalações (perfil admin/master).

### Agenda por dia
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/05-agenda-por-dia.png" alt="Agenda por dia com chips" width="280" />
</p>

Chips **Hoje / Amanhã / +2 / +3** para colar e planejar a agenda. Ponto verde = dia já preenchido. Na virada do dia, o plano futuro é promovido ou o dia inicia limpo.

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| **Autenticação** | Perfis master, admin e técnico (técnico vê só a própria agenda) |
| **Monitoramento** | Totais, filtros por tipo de O.S., lista expansível por técnico |
| **Agenda inteligente** | Colar texto de O.S., parser (formato clássico e Ativo Telecom), cards com Maps e status |
| **Agendamento multi-dia** | Hoje + até 3 dias à frente; histórico de dias passados |
| **Status de O.S.** | Em rota / concluído / não concluído + observações e scripts para WhatsApp/Telegram |
| **Histórico em calendário** | Dias agendados em verde; detalhe por data |
| **Instalações** | CTO, porta, drop, equipamento + GPS; cliente clicável abre no Maps |
| **CTO vinculada** | Clique na CTO lista todos os clientes da mesma CTO |
| **Relatórios** | Diário geral e individual por técnico |
| **PWA** | Manifest, tema escuro, uso mobile com safe-area |

---

## 🛠️ Stack Tecnológica

- **HTML5 / CSS3 / JavaScript (vanilla)** — SPA sem framework
- **MockAPI** (REST) + localStorage
- **Geolocation API** e **Clipboard API**
- **Service Worker** + Web App Manifest (PWA)
- **Vercel** (deploy)

### Modelo de dados por técnico

```text
agenda + status + agendaData     → dia corrente
agendasFuturas[AAAA-MM-DD]       → planejamento (hoje+1 … +3)
agendasHistorico[AAAA-MM-DD]     → dias passados
statusHistorico[]                → log de mudanças de status
instalacoes[]                    → CTO, porta, lat/lng, etc.
```

---

## 🚀 Como rodar

1. Abra `index.html` no navegador **ou** acesse o deploy:
   🔗 **[https://monitor-liard-eta.vercel.app](https://monitor-liard-eta.vercel.app)**

2. Logins de demonstração:
   - **master** / `master123`
   - **admin** / `mike`

3. Técnicos: **nome cadastrado** + senha definida no painel.

A URL da API está no início do `<script>` (`API_URL`).

---

## 📂 Estrutura

```text
├── index.html                 # App principal (SPA)
├── Monitor_Operacional.html
├── demo-agenda-tecnico.gif
├── 01-login.png … 06-dashboard-desktop.png
├── manifest.json / sw.js / icon-*.png
├── api/
│   └── galeria.js
└── vercel.json
```

---

## 💼 Por que este projeto importa no portfólio

Projeto orientado a **operação real de campo**:

- Parser de agendas vindas de texto livre
- Fluxo completo de status de O.S.
- GPS em instalação
- Histórico auditável por calendário
- UI **mobile-first** e base de PWA
- Modelagem de estado + sincronização com API
- UX operacional (copiar script, Maps em um toque, chips de data)

Demonstra capacidade de entregar solução útil sem depender de frameworks pesados.

---

## 👨‍💻 Autor

**Guilherme Marques Santos**  
Front-end Developer | Telecom / Fibra Óptica  
[GitHub](https://github.com/droidmarx)

---

*Capturas e GIF gerados a partir da versão atual do app em produção.*
