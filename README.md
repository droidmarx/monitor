# Agenda Técnico Inteligente

**PWA de monitoramento e gestão de ordens de serviço (O.S.) para equipes de campo de telecom/fibra óptica.**

Aplicação web mobile-first, com login por perfil, sincronização em nuvem, agendamento por dia, histórico em calendário e fluxo completo de status das O.S. — da rota até a conclusão ou instalação.

---

## Capturas de tela

### Tela de login
![Login](docs/screenshots/01-login.png)

Acesso por perfil (**master**, **admin** ou **técnico**), com validação de credenciais e sessão persistente.

### Dashboard de monitoramento
![Dashboard mobile](docs/screenshots/02-dashboard.png)

Visão geral das O.S. com gráfico donut, filtros por tipo de serviço (instalação, LOS, lentidão etc.) e cards por técnico com status em tempo quase real.

![Dashboard desktop](docs/screenshots/06-dashboard-desktop.png)

### Histórico geral em calendário
![Histórico calendário](docs/screenshots/03-historico-calendario.png)

Calendário mensal em que **dias com agendamento** aparecem com **indicador verde**. Toque no dia para ver instalações, O.S. em rota, concluídas e não concluídas.

### Gestão de técnicos (admin)
![Gerenciar técnicos](docs/screenshots/04-gerenciar-tecnicos.png)

Cadastro de técnicos, senhas de acesso, abertura de agenda individual, relatórios e atalhos de histórico/instalações.

### Agenda por dia
![Agenda por dia](docs/screenshots/05-agenda-por-dia.png)

Chips **Hoje / Amanhã / +2 / +3** para colar e planejar a agenda de cada data. Pontos verdes marcam dias já preenchidos. Na virada do dia, o planejamento futuro é promovido ou o dia inicia limpo.

---

## Problema que resolve

Equipes de campo precisam:

- distribuir O.S. por técnico e por dia;
- acompanhar status (em rota, concluído, não concluído) em tempo real;
- gerar scripts prontos para WhatsApp/Telegram;
- registrar instalações (CTO, porta, drop, GPS);
- consultar o que foi feito em dias anteriores.

O **Agenda Técnico Inteligente** centraliza isso em um único app web, usável no celular do técnico e no painel do supervisor.

---

## Funcionalidades principais

| Área | Recursos |
|------|----------|
| **Autenticação** | Perfis master, admin e técnico; técnico vê só a própria agenda |
| **Monitoramento** | Dashboard com totais, filtros por tipo de O.S., lista expansível por técnico |
| **Agenda** | Colar texto de O.S., parser inteligente (formatos clássico e Ativo Telecom), cards com Maps / status |
| **Agendamento multi-dia** | Hoje + até 3 dias à frente; histórico de dias passados; dia seguinte limpo se não houver plano |
| **Status de O.S.** | Em rota, concluído, não concluído + observações; cópia automática de scripts |
| **Histórico** | Calendário com dias agendados em verde; detalhe por data |
| **Instalações** | Formulário CTO/porta/drop/equipamento + captura de GPS; link no Maps no histórico |
| **CTO vinculada** | Clique na CTO lista todos os clientes da mesma CTO |
| **Relatórios** | Relatório diário geral e individual por técnico |
| **PWA** | Manifest, tema escuro, uso mobile com área segura |

---

## Stack técnica

- **HTML5 / CSS3 / JavaScript (vanilla)** — app de página única, sem framework
- **MockAPI** — persistência REST (agenda, status, histórico, instalações, senhas)
- **localStorage / sessionStorage** — cache de status e sessão
- **Geolocation API** — coordenadas da instalação
- **Clipboard API** — cópia de scripts e credenciais
- **Service Worker / Manifest** — base para PWA

### Modelo de dados (por técnico)

```text
agenda + status + agendaData     → dia corrente
agendasFuturas[AAAA-MM-DD]       → planejamento (hoje+1 … +3)
agendasHistorico[AAAA-MM-DD]     → dias passados (agenda + status)
statusHistorico[]                → log de mudanças de status
instalacoes[]                    → histórico com CTO, porta, lat/lng
```

---

## Perfis de uso

1. **Master / Admin** — visão de todos os técnicos, colar agendas, migrar O.S., relatórios, histórico geral, instalações do mês.
2. **Técnico** — só a própria rota, atualizar status, colar agenda do dia, registrar instalação, relatório pessoal.

---

## Como rodar

1. Abra `agenda-tecnico.html` em um navegador moderno (ou sirva via HTTP estático).
2. Login padrão de demonstração:
   - **master** / `master123`
   - **admin** / `mike`
3. Técnicos usam o **nome cadastrado** como usuário e a senha definida no painel.

> A URL da API está no início do `<script>` (`API_URL`). Ajuste para o seu endpoint se for reutilizar o projeto.

---

## Destaques de UX

- Visual **dark** com gradientes e glassmorphism leves
- Layout **mobile-first**, touch targets generosos
- Modais bottom-sheet no mobile
- Feedback por **toast** e loading overlay
- Ícones SVG em sprite inline (sem dependência externa de icon font)

---

## Estrutura do repositório

```text
├── agenda-tecnico.html          # Aplicação completa
├── README.md                    # Este arquivo
└── docs/
    └── screenshots/             # Prints para portfólio
        ├── 01-login.png
        ├── 02-dashboard.png
        ├── 03-historico-calendario.png
        ├── 04-gerenciar-tecnicos.png
        ├── 05-agenda-por-dia.png
        └── 06-dashboard-desktop.png
```

---

## Possíveis evoluções

- Backend próprio (auth JWT, multi-empresa)
- Notificações push quando O.S. muda de status
- Mapa com todas as rotas do dia
- Exportação PDF do relatório diário
- Offline-first com fila de sincronização

---

## Autor / portfólio

Projeto focado em **produto real para operação de campo**: parser de agendas, fluxo de status, GPS em instalação e histórico auditável por calendário.

Ideal para demonstrar:

- domínio de **UI mobile** e PWA;
- modelagem de **estado e sincronização**;
- cuidado com **UX operacional** (copiar script, um toque para Maps, chips de data).

---

*Interface em português (pt-BR). Capturas geradas a partir da versão atual do app.*
