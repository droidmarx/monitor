# Agenda Técnico Inteligente

**PWA de monitoramento e gestão de ordens de serviço para equipes de campo (telecom / fibra óptica).**

Aplicação web mobile-first com login por perfil, sincronização em nuvem, agendamento por dia, histórico em calendário e fluxo completo de status das O.S.

<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/demo-agenda-tecnico.gif" alt="Demo animada do Agenda Técnico Inteligente" width="320" />
</p>

<p align="center">
  <em>Demo: login → dashboard → histórico em calendário → gestão de técnicos → agenda por dia</em>
</p>

---

## Visão geral

| | |
|---|---|
| **Tipo** | Single Page Application (HTML5 + CSS + JS vanilla) |
| **Uso** | Celular do técnico + painel do supervisor |
| **Persistência** | MockAPI (REST) + localStorage |
| **Idioma** | Português (pt-BR) |

---

## Interface

### Login
<p align="center">
  <img src="https://raw.githubusercontent.com/droidmarx/monitor/main/01-login.png" alt="Tela de login" width="280" />
</p>

Acesso por perfil (**master**, **admin** ou **técnico**), com validação de credenciais e sessão persistente na aba.

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

## Funcionalidades

- **Autenticação** — master, admin e técnico (técnico vê só a própria agenda)
- **Monitoramento** — totais, filtros por tipo de O.S., lista expansível por técnico
- **Agenda inteligente** — colar texto de O.S., parser (formato clássico e Ativo Telecom), cards com Maps e status
- **Agendamento multi-dia** — hoje + até 3 dias à frente; histórico de dias passados
- **Status de O.S.** — em rota / concluído / não concluído + observações e scripts para WhatsApp/Telegram
- **Histórico em calendário** — dias agendados em verde; detalhe por data
- **Instalações** — CTO, porta, drop, equipamento + GPS; cliente clicável abre no Maps
- **CTO vinculada** — clique na CTO lista todos os clientes da mesma CTO
- **Relatórios** — diário geral e individual por técnico
- **PWA** — manifest, tema escuro, uso mobile com safe-area

---

## Stack

- HTML5 / CSS3 / JavaScript (vanilla)
- MockAPI (REST)
- Geolocation API, Clipboard API
- Service Worker + Web App Manifest

### Dados por técnico

```text
agenda + status + agendaData     → dia corrente
agendasFuturas[AAAA-MM-DD]       → planejamento (hoje+1 … +3)
agendasHistorico[AAAA-MM-DD]     → dias passados
statusHistorico[]                → log de mudanças de status
instalacoes[]                    → CTO, porta, lat/lng, etc.
```

---

## Como rodar

1. Abra `index.html` no navegador (ou o deploy na Vercel).
2. Logins de demonstração:
   - **master** / `master123`
   - **admin** / `mike`
3. Técnicos: **nome cadastrado** + senha definida no painel.

A URL da API está no início do `<script>` (`API_URL`).

---

## Estrutura

```text
├── index.html
├── README.md
├── demo-agenda-tecnico.gif
├── 01-login.png
├── 02-dashboard.png
├── 03-historico-calendario.png
├── 04-gerenciar-tecnicos.png
├── 05-agenda-por-dia.png
├── 06-dashboard-desktop.png
├── manifest.json / sw.js / icon-*.png
├── api/
└── vercel.json
```

---

## Portfólio

Projeto orientado a **operação real de campo**: parser de agendas, fluxo de status, GPS em instalação e histórico auditável por calendário.

Demonstra:

- UI **mobile-first** e base de PWA  
- modelagem de **estado + sincronização**  
- UX operacional (copiar script, Maps em um toque, chips de data)

---

*Capturas e GIF gerados a partir da versão atual do app.*
