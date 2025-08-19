# 🔍 Guia Completo - Como Verificar Escalas Importadas

## 📋 Opções Disponíveis

### 1. **Interface Web Visual (Recomendado)**
Acesse: `http://localhost:3000/verificar-escalas.html`

**Funcionalidades:**
- ✅ Visualização organizada por funcionário
- ✅ Estatísticas em tempo real
- ✅ Status das escalas (Ativa/Inativa)
- ✅ Indicador de renovação automática
- ✅ Interface responsiva e amigável

### 2. **Script de Verificação (Terminal)**
Execute: `verificar-escalas.bat` ou `node verificar-escalas.js`

**O que mostra:**
- ✅ Status geral do sistema
- ✅ Lista detalhada de todas as escalas
- ✅ Funcionários organizados por equipe
- ✅ Datas formatadas em português

### 3. **APIs Diretas (Para desenvolvedores)**

#### Verificar Status Geral:
```bash
GET http://localhost:3001/api/status
```

#### Listar Todas as Escalas:
```bash
GET http://localhost:3001/api/escalas
```

#### Escalas de um Funcionário Específico:
```bash
GET http://localhost:3001/api/escalas/funcionario/{ID}
```

#### Listar Funcionários:
```bash
GET http://localhost:3001/api/funcionarios
```

## 🚀 Como Usar

### Passo 1: Iniciar o Sistema
```bash
# Opção A: Usar o script automático
verificar-escalas.bat

# Opção B: Manual
cd backend
node server.js
```

### Passo 2: Verificar Escalas

#### **Via Interface Web:**
1. Abra o navegador
2. Acesse: `http://localhost:3000/verificar-escalas.html`
3. Visualize todas as escalas organizadamente

#### **Via Script:**
1. Execute: `node verificar-escalas.js`
2. Veja o relatório completo no terminal

## 📊 Dados Importados da Planilha

### Funcionários Regulares:
- Thiago Castro Rodrigues
- Isaias Jose Da Silva Queiroz  
- Wanderson Barbosa Fernandes De Azevedo
- Márcio Antônio Berzotti Gomes
- Tiago Vieira Mendes
- Cláudio Vieira De Azevedo Torres
- Silvio dos Reis Lourenço
- Alexandre Da Cruz Silva Paiva
- Joao Vitor Nogueira De Mendonça
- Manuela Nogueira Malagães

### Supervisores:
- Diego Elias Vilas Boas
- Marcelo Martins Valente
- Adilânir Azevedo Batistüo Junior
- Vancersson Mendes De Mello
- Fernando Gordon De Oliveira
- Geraldo Delane Carlos Guimarães Silva
- Joe Correa Fernandes De Oliveira
- Diego Rangel Santos Campos Malpani

### Equipe Extra:
- Geraldo
- Filipe Martins

## 📅 Escalas Cadastradas

### Resumo:
- **Total de Escalas**: 33 escalas cadastradas
- **Período**: Julho a Outubro 2025
- **Formato**: 14x14 (14 dias trabalhando, 14 dias folga)
- **Status**: Todas ativas com renovação automática

### Exemplos de Escalas:

**Thiago Castro Rodrigues:**
- 17/07/2025 → 30/07/2025
- 14/08/2025 → 27/08/2025
- 11/09/2025 → 24/09/2025
- 09/10/2025 → 22/10/2025

**Tiago Vieira Mendes:**
- 18/07/2025 → 31/07/2025
- 15/08/2025 → 28/08/2025
- 12/09/2025 → 25/09/2025
- 10/10/2025 → 23/10/2025

## 🔧 Verificações Importantes

### ✅ O que Verificar:
1. **Quantidade de funcionários**: 20 total
2. **Escalas por funcionário**: Múltiplas escalas sequenciais
3. **Datas corretas**: Períodos de 14 dias exatos
4. **Status ativo**: Todas as escalas devem estar ativas
5. **Renovação automática**: Habilitada para todos

### ❌ Possíveis Problemas:
- Servidor não iniciado (porta 3001)
- Conflitos de data entre escalas
- Funcionários sem escalas cadastradas
- Escalas inativas sem motivo

## 🛠️ Comandos Úteis

### Verificar se o servidor está rodando:
```bash
netstat -an | findstr :3001
```

### Testar API manualmente:
```bash
curl http://localhost:3001/api/status
```

### Reiniciar o servidor:
```bash
cd backend
node server.js
```

## 📞 Troubleshooting

### Problema: "Erro ao conectar com servidor"
**Solução:**
1. Certifique-se que o backend está rodando
2. Verifique se a porta 3001 está disponível
3. Execute: `cd backend && node server.js`

### Problema: "Nenhuma escala encontrada"
**Solução:**
1. Verifique se os dados foram importados corretamente
2. Confira o arquivo `server.js` na seção `escalas14x14`
3. Execute novamente a importação da planilha

### Problema: "Datas incorretas"
**Solução:**
1. Verifique o formato das datas na planilha
2. Confirme que os períodos são de exatamente 14 dias
3. Reimporte os dados corrigidos

## 💡 Dicas

1. **Use a interface web** para visualização mais clara
2. **Execute o script** para relatórios detalhados
3. **Monitore as estatísticas** para validar importação
4. **Verifique regularmente** se a renovação automática está funcionando

---

**✅ Sistema Verificado:** Todas as escalas da planilha foram importadas corretamente com 33 escalas distribuídas entre 10 funcionários regulares, cobrindo o período de julho a outubro de 2025.
