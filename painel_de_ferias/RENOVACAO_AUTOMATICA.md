# 🔄 Sistema de Renovação Automática - Escala 14x14

## Como Funciona

O sistema agora possui **renovação automática** das escalas 14x14, garantindo continuidade no trabalho dos funcionários sem intervenção manual.

### 📅 Ciclo da Escala 14x14

1. **Período de Trabalho**: 14 dias corridos (Embarque → Desembarque)
2. **Período de Folga**: 14 dias corridos após o desembarque  
3. **Renovação Automática**: Nova escala criada automaticamente no último dia da folga

### ⚙️ Configuração

- **Padrão**: Renovação automática **ATIVA** para novas escalas
- **Controle**: Funcionário pode ativar/desativar a qualquer momento
- **Flexibilidade**: Pode ser alterada individualmente por cada funcionário

### 🔄 Processo Automático

**Verificação Contínua:**
- Sistema verifica escalas a cada hora
- Identifica escalas que terminam no dia seguinte
- Cria automaticamente a próxima escala se renovação estiver ativa

**Cálculo Automático:**
- **Término da Escala**: Data do desembarque
- **Período de Folga**: 14 dias após desembarque
- **Próximo Embarque**: 15º dia após desembarque (início da nova escala)
- **Próximo Desembarque**: 14º dia após novo embarque

### 📊 Exemplo Prático

```
Escala 1: 01/08/2025 → 14/08/2025 (14 dias trabalhados)
Folga:    15/08/2025 → 28/08/2025 (14 dias de folga)
Escala 2: 29/08/2025 → 11/09/2025 (renovação automática)
Folga:    12/09/2025 → 25/09/2025 (14 dias de folga)
Escala 3: 26/09/2025 → 09/10/2025 (renovação automática)
```

### 🎛️ Controles Disponíveis

**Para Funcionários:**
- ✅ Ativar/Desativar renovação automática
- 📝 Cadastrar escalas manualmente
- ✏️ Editar escalas existentes
- ❌ Desativar escalas

**Para Sistema:**
- 🔄 Verificação automática contínua
- 📊 Histórico completo de escalas
- 🎯 Validação de períodos de 14 dias
- 📅 Cálculo automático de datas

### 🚀 Vantagens

1. **Continuidade**: Sem interrupção no ciclo de trabalho
2. **Praticidade**: Funcionário não precisa lembrar de cadastrar
3. **Flexibilidade**: Pode desativar quando necessário
4. **Controle**: Histórico completo sempre disponível
5. **Precisão**: Cálculos automáticos evitam erros

### 🛠️ APIs Implementadas

- `GET /api/renovacao/:funcionarioId` - Buscar configuração
- `PUT /api/renovacao/:funcionarioId` - Atualizar configuração  
- `POST /api/verificar-renovacao` - Forçar verificação manual
- `GET /api/escalas/funcionario/:id` - Listar escalas

### 📱 Interface

- **Checkbox**: Controle visual da renovação automática
- **Histórico**: Mostra se cada escala tem renovação ativa
- **Status**: Indicadores visuais do estado de cada escala
- **Timeline**: Visualização clara dos períodos

---

## 🧪 Como Testar

1. **Acesse**: `http://localhost:3000/teste-renovacao.html`
2. **Criar Escala**: Clique em "Criar Escala Demo"
3. **Simular Tempo**: Clique em "Simular Passagem do Tempo"
4. **Verificar**: Clique em "Verificar Renovação"
5. **Observar**: Nova escala será criada automaticamente

O sistema está totalmente funcional e garante que os funcionários sempre tenham suas escalas renovadas automaticamente!
