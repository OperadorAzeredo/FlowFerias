# 🐛 Debug - Erro HTTP no Cadastro de Escala

## 📋 Problema Identificado

Você está enfrentando um erro HTTP ao tentar cadastrar escalas no sistema. Este arquivo contém as correções e ferramentas de debug implementadas.

## 🔧 Correções Implementadas

### 1. **Melhorias no Backend (server.js)**
- ✅ Adicionado tratamento de erro robusto com try-catch
- ✅ Melhorado middleware CORS para suportar mais origens
- ✅ Adicionado logs detalhados para debug
- ✅ Validação aprimorada de dados de entrada
- ✅ Conversão segura de tipos (string → número)
- ✅ Tratamento de erros globais

### 2. **Servidor de Debug (server-debug.js)**
- ✅ Versão simplificada do servidor para identificar problemas
- ✅ Logs detalhados de todas as operações
- ✅ Tratamento de erros específicos
- ✅ Base de dados reduzida para testes

### 3. **Interface de Debug (debug-escala.html)**
- ✅ Ferramenta visual para testar a API
- ✅ Exibe detalhes completos de requisições e respostas
- ✅ Validação de datas em tempo real
- ✅ Logs de debug visuais

## 🚀 Como Testar e Resolver

### **Passo 1: Execute o Servidor de Debug**
```cmd
cd "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias"
test-debug.bat
```

### **Passo 2: Teste a Conexão**
1. Abra o navegador em: http://localhost:3001/../debug-escala.html
2. Clique em **"Testar Conexão API"**
3. Verifique se aparece "✅ Conexão com API funcionando!"

### **Passo 3: Teste o Cadastro de Escala**
1. Selecione um funcionário
2. Escolha a data de embarque
3. A data de desembarque será preenchida automaticamente (14 dias)
4. Clique em **"Cadastrar Escala"**
5. Observe os logs detalhados na tela

## 🔍 Possíveis Causas do Erro

### **1. Porta em Uso**
- **Sintoma**: Erro "EADDRINUSE"
- **Solução**: Encerre outros processos na porta 3001 ou reinicie o computador

### **2. Dados Inválidos**
- **Sintoma**: Erro 400 - Bad Request
- **Solução**: Verifique se os dados estão no formato correto
- **Debug**: Use a interface debug-escala.html para ver exatamente o que está sendo enviado

### **3. Funcionário Não Encontrado**
- **Sintoma**: Erro 404 - Not Found
- **Solução**: Verifique se o ID do funcionário existe
- **Debug**: Clique em "Listar Funcionários" para ver IDs disponíveis

### **4. Período Inválido**
- **Sintoma**: Erro "A escala deve ter exatamente 14 dias"
- **Solução**: Certifique-se que há exatamente 13 dias entre embarque e desembarque
- **Debug**: A interface calcula automaticamente o período correto

## 📊 Logs de Debug

O servidor agora exibe logs detalhados:

```
📨 2025-07-26T10:30:00.000Z - POST /api/escalas
📦 Body: {
  "funcionarioId": 1,
  "dataEmbarque": "2025-07-27",
  "dataDesembarque": "2025-08-09"
}
📊 Validação de período: { diferencaDias: 13, esperado: 13 }
✅ Escala criada com sucesso: { id: 1, funcionarioId: 1, ... }
```

## 🛠️ Comandos Úteis

### **Parar Processos na Porta 3001**
```cmd
netstat -ano | findstr :3001
taskkill /PID [numero_do_pid] /F
```

### **Verificar Se o Servidor Está Rodando**
```cmd
curl http://localhost:3001/api/status
```

### **Instalar Dependências (se necessário)**
```cmd
cd backend
npm install
```

## 📞 Próximos Passos

1. **Execute o test-debug.bat**
2. **Use a interface debug-escala.html**
3. **Analise os logs no terminal**
4. **Se o problema persistir, copie os logs de erro exatos**

## ✅ Correções Específicas Implementadas

### **No server.js:**
- Linha ~800-900: Melhorado POST /api/escalas com logs e validações
- Linha ~15-35: Melhorado middleware CORS e logs
- Linha ~900-950: Melhorado PUT /api/escalas/:id
- Linha ~950-980: Melhorado DELETE /api/escalas/:id

### **Arquivos Criados:**
- `server-debug.js` - Servidor simplificado para debug
- `debug-escala.html` - Interface visual de debug
- `test-debug.bat` - Script automatizado de teste
- `DEBUG_ESCALAS.md` - Esta documentação

## 🎯 Resultado Esperado

Após seguir estes passos, você deve conseguir:
- ✅ Conectar com a API sem erros
- ✅ Cadastrar escalas com sucesso
- ✅ Ver logs detalhados de debug
- ✅ Identificar qualquer problema específico

---

**💡 Dica**: Sempre use a interface debug-escala.html primeiro para identificar problemas antes de usar a interface principal do sistema.
