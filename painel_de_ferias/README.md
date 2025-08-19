# 🌊 Flow Férias - Sistema de Gestão de Férias

Sistema completo para gestão e controle de férias empresariais com autenticação SAP ID e interface moderna.

- **Backend**: API REST em Node.js com Express
- **Frontend**: Interface web com HTML, CSS e JavaScript vanilla
- **Identidade Visual**: Flow Férias com paleta de cores corporativa

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- Login com SAP ID e senha
- Validação de credenciais segura
- Redirecionamento automático baseado no perfil
- Sessão persistente com localStorage

### 👤 Para Funcionários
- Dashboard personalizado com nome e SAP ID
- Solicitação de férias com validação de datas
- Visualização do histórico de solicitações
- Interface intuitiva e responsiva

### 👔 Para Supervisores
- Dashboard com estatísticas de solicitações
- Visualização de todas as solicitações de férias
- Aprovação ou rejeição de solicitações
- Controle automático de conflitos (não permite férias de dois funcionários no mesmo mês)

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Autenticação**: SAP ID/Senha com validação local e API
- **Comunicação**: Fetch API / REST
- **Armazenamento**: Dados em memória (para demonstração)
- **Design**: Paleta Flow Férias (Berkeley Blue, Pacific Cyan, Yellow Green, Carrot Orange, Butterscotch)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Backend

```bash
cd backend
npm install
npm start
```

O backend estará disponível em: `http://localhost:3002`

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em: `http://localhost:3000`

### 3. Acesso ao Sistema

**URL Principal:** `http://localhost:3000/login.html`

**Credenciais de Teste:**
- **Supervisor:** SAP `98765` | Senha `super123`
- **Funcionário:** SAP `12345` | Senha `func123`

📖 **Documentação completa de credenciais:** `CREDENCIAIS_LOGIN.md`

## 🌐 Endpoints da API

### Autenticação
- `POST /auth/login` - Autenticação com SAP ID e senha

### Funcionários
- `GET /api/funcionarios` - Lista todos os funcionários
- `GET /api/funcionarios/:id` - Busca funcionário por ID

### Férias
- `GET /api/ferias` - Lista todas as solicitações
- `GET /api/ferias/funcionario/:funcionarioId` - Férias de um funcionário específico
- `POST /api/ferias` - Criar nova solicitação
- `PUT /api/ferias/:id/aprovar` - Aprovar solicitação
- `PUT /api/ferias/:id/rejeitar` - Rejeitar solicitação
- `DELETE /api/ferias/:id` - Excluir solicitação

### Status
- `GET /api/status` - Status do servidor

## 📊 Estrutura do Projeto

```
painel_de_ferias/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── server.js
│   └── public/
│       ├── login.html      # 🔐 Página de autenticação
│       ├── index.html      # 🏠 Página inicial
│       ├── funcionario.html # 👤 Dashboard do funcionário  
│       └── supervisor.html  # 👔 Dashboard do supervisor
├── CREDENCIAIS_LOGIN.md     # 📋 Credenciais de teste
├── IMPLEMENTACAO_COMPLETA.md # 📖 Documentação técnica
└── README.md
```

## 🔒 Regras de Negócio

1. **Autenticação Obrigatória**: Login com SAP ID e senha é obrigatório
2. **Validação de Conflitos**: Não é permitido ter férias aprovadas de dois funcionários no mesmo mês
3. **Validação de Datas**: Data de início deve ser anterior à data de fim
4. **Sessão Persistente**: Login fica salvo no navegador até logout manual
5. **Status das Solicitações**: 
   - `pendente`: Aguardando aprovação
   - `aprovada`: Aprovada pelo supervisor
   - `rejeitada`: Rejeitada pelo supervisor

## 💡 Funcionalidades Implementadas

### Backend
- ✅ API RESTful completa
- ✅ Sistema de autenticação com SAP ID/senha
- ✅ Validação de conflitos de férias por mês
- ✅ CORS habilitado para comunicação com frontend
- ✅ Dados em memória para demonstração
- ✅ Tratamento de erros

### Frontend
- ✅ Interface responsiva e moderna com identidade Flow Férias
- ✅ Sistema de login com SAP ID e senha
- ✅ Proteção de rotas (redirecionamento se não autenticado)
- ✅ Dashboard do supervisor com estatísticas
- ✅ Formulário de solicitação de férias
- ✅ Visualização do histórico de solicitações
- ✅ Validações no frontend
- ✅ Feedback visual para ações do usuário
- ✅ Logout com limpeza de sessão

## 🎯 Como Usar

### 🚀 **Início Rápido**
1. **Inicie o backend**: Execute `npm start` na pasta `backend`
2. **Inicie o frontend**: Execute `npm start` na pasta `frontend`
3. **Acesse o login**: Abra `http://localhost:3000/login.html` no navegador

### 🔐 **Fazendo Login**
1. **Selecione o tipo de acesso**: Funcionário ou Supervisor
2. **Digite as credenciais**:
   - **SAP ID**: Seu número de identificação
   - **Senha**: Sua senha pessoal
3. **Clique em "Entrar no Sistema"**

### 👤 **Para Funcionários**
1. Faça login com credenciais de funcionário
2. Visualize seu dashboard personalizado
3. Solicite férias usando o formulário
4. Acompanhe o status das suas solicitações

### 👔 **Para Supervisores**
1. Faça login com credenciais de supervisor
2. Visualize dashboard com estatísticas gerais
3. Aprove ou rejeite solicitações de férias
4. Monitore conflitos e planejamento de equipe

### 🎮 **Modo Demonstração**
- Use os botões "Demo Funcionário" ou "Demo Supervisor" para acesso rápido
- Credenciais de teste estão disponíveis na tela de login

## 🔄 Fluxo de Trabalho

1. **Login**: Funcionário/Supervisor faz login com SAP ID e senha
2. **Autenticação**: Sistema valida credenciais e redireciona para dashboard apropriado
3. **Solicitação**: Funcionário faz solicitação de férias
4. **Validação**: Sistema valida se não há conflito com outros funcionários no mesmo mês
5. **Pendência**: Solicitação fica pendente aguardando aprovação
6. **Supervisão**: Supervisor visualiza solicitação no dashboard
7. **Decisão**: Supervisor aprova ou rejeita a solicitação
8. **Atualização**: Sistema atualiza o status da solicitação
9. **Logout**: Usuário pode fazer logout para limpar a sessão

## 📝 Observações

- Este é um projeto de demonstração com dados em memória
- **Credenciais de teste** estão disponíveis no arquivo `CREDENCIAIS_LOGIN.md`
- Em produção, seria necessário implementar um banco de dados
- **Senhas são armazenadas em texto simples** (apenas para demonstração)
- O sistema considera conflito por mês completo, não por dias específicos
- **Sessão persiste** no navegador até logout manual

## 🚀 Próximos Passos

Para evoluir o sistema, considere:

### 🔒 **Segurança**
- Implementar hash de senhas (bcrypt, Argon2)
- Adicionar JWT tokens para autenticação
- Implementar rate limiting para tentativas de login
- Usar HTTPS em produção
- Adicionar 2FA (autenticação de dois fatores)

### 💾 **Banco de Dados**
- Migrar para PostgreSQL, MySQL ou MongoDB
- Implementar migrations e seeds
- Adicionar backup automático
- Otimizar consultas e índices

### 📧 **Comunicação**
- Notificações por email para aprovações/rejeições
- Lembretes automáticos de férias próximas
- Relatórios periódicos para supervisores

### 📅 **Funcionalidades**
- Calendário visual interativo
- Planejamento de férias por equipe
- Relatórios de férias avançados
- Sistema de substituições
- Controle de saldo de férias

### 🧪 **Qualidade**
- Implementar testes automatizados (Jest, Cypress)
- Cobertura de testes
- CI/CD pipeline
- Monitoring e logs estruturados
