# 🔐 Credenciais de Login - Sistema Flow Férias

## 📋 **Credenciais para Teste**

### 👔 **SUPERVISOR**
- **SAP ID:** `98765`
- **Senha:** `super123`
- **Nome:** Maria Santos
- **Acesso:** Painel do Supervisor
- **Funcionalidades:** Aprovar solicitações, gerenciar escalas, relatórios

### 👤 **FUNCIONÁRIOS**

#### Funcionário Principal
- **SAP ID:** `12345`
- **Senha:** `func123`
- **Nome:** João Silva
- **Departamento:** TI
- **Acesso:** Painel do Funcionário

#### Outros Funcionários
- **SAP ID:** `11122` | **Senha:** `func456` | **Nome:** Pedro Costa (Design)
- **SAP ID:** `55566` | **Senha:** `func789` | **Nome:** Ana Lima (Vendas)

#### Equipe Extra (Cobertura)
- **SAP ID:** `77777` | **Senha:** `extra123` | **Nome:** Carlos Extra
- **SAP ID:** `88888` | **Senha:** `extra456` | **Nome:** Julia Extra
- **SAP ID:** `99999` | **Senha:** `extra789` | **Nome:** Roberto Extra

---

## 🚀 **Como Usar**

### **Método 1: Login com Credenciais**
1. Acesse: `http://localhost:3000/login.html`
2. Clique no tipo de acesso (Funcionário ou Supervisor)
3. Digite o SAP ID e senha
4. Clique em "Entrar no Sistema"

### **Método 2: Login Rápido (Demo)**
1. Acesse: `http://localhost:3000/login.html`
2. Clique em "Demo Funcionário" ou "Demo Supervisor"
3. Acesso direto sem credenciais

---

## 🔧 **URLs do Sistema**

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3002
- **Login:** http://localhost:3000/login.html
- **Painel Funcionário:** http://localhost:3000/funcionario.html
- **Painel Supervisor:** http://localhost:3000/supervisor.html

---

## ⚙️ **Configuração Técnica**

### **Autenticação Frontend**
- Validação local via JavaScript
- Armazenamento em `localStorage`
- Redirecionamento automático baseado no tipo de usuário

### **Autenticação Backend**
- Rota: `POST /auth/login`
- Validação de SAP ID e senha
- Retorna token e dados do usuário

### **Dados Armazenados no localStorage**
```javascript
{
  userType: 'funcionario' | 'supervisor',
  userId: 'SAP_ID',
  userName: 'Nome do Usuário',
  userSapId: 'SAP_ID'
}
```

---

## 🛡️ **Segurança**

⚠️ **IMPORTANTE:** Este é um sistema de demonstração com senhas simples. Em produção:
- Use hash de senhas (bcrypt)
- Implemente JWT tokens
- Adicione rate limiting
- Use HTTPS
- Implemente 2FA se necessário
