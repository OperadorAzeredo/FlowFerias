# 🔄 Sistema de Cobertura Inteligente de Férias

## 🎯 Visão Geral

O sistema agora possui **cobertura inteligente** que considera a escala 14x14 dos funcionários para determinar automaticamente a melhor estratégia de cobertura de férias.

## 📋 Regras Implementadas

### **Funcionários Regulares (Escala 14x14)**

#### **Situação Normal**
- **Disponibilidade**: Pode trabalhar **até 21 dias consecutivos**
- **Condição**: Funcionário não está no limite de 14 dias trabalhados
- **Uso**: Para coberturas completas (até 21 dias)

#### **Situação de Limitação**
- **Limitação**: Pode trabalhar **máximo 7 dias adicionais**
- **Condição**: Funcionário acabou de trabalhar 14 dias consecutivos
- **Razão**: Limite máximo de 14 + 7 = 21 dias consecutivos de trabalho
- **Identificação**: Sistema verifica automaticamente se está no 14º dia
- **Uso**: Para coberturas parciais apenas

### **Equipe Extra - Limitação de 21 Dias**
- **Funcionários Especiais**: Dedicados exclusivamente para coberturas
- **Disponibilidade**: **Até 21 dias consecutivos** (limite trabalhista)
- **Prioridade**: Sistema prefere usar quando disponível
- **Uso**: Para coberturas médias e longas (até 21 dias)

## 🔧 Funcionamento Técnico

### **Análise Automática de Status**
```javascript
// Para cada funcionário, o sistema verifica:
- Status atual: trabalhando | folga | disponível
- Dias já trabalhados na escala atual
- Limitação: máximo de dias que pode trabalhar
- Disponibilidade para cobertura
```

### **Algoritmo de Sugestão Inteligente**

#### **Estratégia 1: Equipe Extra Completa (Preferencial)**
- Verifica se algum funcionário da equipe extra pode cobrir completamente
- **Vantagem**: Dedicados para coberturas, até 21 dias

#### **Estratégia 2: Funcionário Regular Completo**
- Verifica se funcionário regular pode cobrir todo o período (até 21 dias)
- **Condição**: Funcionário não está no limite de 14 dias trabalhados
- **Vantagem**: Cobertura simples com um funcionário

#### **Estratégia 3: Combinação Inteligente**
1. **Funcionários Limitados**: Usar primeiro os com limitação de 7 dias
2. **Funcionários Regulares**: Usar os que podem trabalhar até 21 dias  
3. **Equipe Extra**: Completar com funcionários até 21 dias
- **Resultado**: Cobertura otimizada utilizando todos os recursos disponíveis

### **Estrutura de Dados Aprimorada**

#### **Funcionários**
```javascript
{
  id: 1,
  nome: 'João Silva',
  equipe: 'regular' | 'extra',  // Nova propriedade
  cargo: 'Desenvolvedor'
}
```

#### **Cobertura Múltipla**
```javascript
{
  id: 1,
  solicitacaoId: 1,
  coberturas: [
    {
      funcionarioId: 2,
      funcionarioNome: 'Maria Santos',
      dataInicio: '2025-08-01',
      dataFim: '2025-08-07',
      diasCobertura: 7,
      tipoCobertura: 'regular_limitado'
    },
    {
      funcionarioId: 5,
      funcionarioNome: 'Carlos Extra',
      dataInicio: '2025-08-08',
      dataFim: '2025-08-15',
      diasCobertura: 8,
      tipoCobertura: 'equipe_extra'
    }
  ],
  status: 'completa'
}
```

## 🚀 APIs Implementadas

### **1. Sugestões Inteligentes**
```
GET /api/coberturas/sugestoes/:solicitacaoId
```
**Retorna:**
- Análise completa de disponibilidade
- Sugestão ótima de cobertura
- Status de cada funcionário
- Limitações e restrições

### **2. Verificação de Disponibilidade**
```
GET /api/funcionarios/:id/disponibilidade?dataInicio=X&dataFim=Y
```
**Retorna:**
- Status atual do funcionário
- Dias disponíveis para cobertura
- Limitações específicas
- Pode cobrir período completo

### **3. Funcionários por Equipe**
```
GET /api/funcionarios/equipe/:tipo
```
**Tipos:**
- `regular`: Funcionários normais da escala 14x14
- `extra`: Funcionários dedicados para coberturas

### **4. Aplicar Cobertura Múltipla**
```
POST /api/coberturas
{
  "solicitacaoId": 1,
  "coberturas": [
    {
      "funcionarioId": 2,
      "dataInicio": "2025-08-01",
      "dataFim": "2025-08-07",
      "diasCobertura": 7,
      "tipoCobertura": "regular_limitado"
    }
  ]
}
```

## 🎮 Interface de Teste

### **Página de Demonstração**
- **URL**: `http://localhost:3000/teste-cobertura-inteligente.html`
- **Funcionalidades**:
  - Criar dados de teste automáticos
  - Visualizar equipes (regular vs extra)
  - Analisar coberturas inteligentes
  - Aplicar sugestões otimizadas

### **Fluxo de Teste**
1. **Criar Dados**: Escalas e solicitações de exemplo
2. **Analisar**: Sistema sugere melhor cobertura
3. **Visualizar**: Status de cada funcionário
4. **Aplicar**: Confirmar cobertura sugerida

## 📊 Exemplo Prático

### **Cenário**: Funcionário precisa de 30 dias de férias

#### **Análise Automática**:
- **João** (regular, trabalhando): Pode cobrir apenas 7 dias (limitação)
- **Maria** (regular): Pode cobrir até 21 dias
- **Carlos** (equipe extra): Pode cobrir até 21 dias

#### **Sugestão Inteligente**:
```
Combinação necessária (30 dias > 21 dias máximo):
1. João Silva (regular limitado): Dias 1-7 (7 dias)
2. Maria Santos (regular): Dias 8-21 (14 dias)  
3. Carlos Extra (equipe extra): Dias 22-30 (9 dias)
```

#### **Resultado**:
- ✅ Cobertura completa garantida (30 dias)
- ✅ Respeita limitações trabalhistas (máximo 21 dias cada)
- ✅ Otimiza uso de recursos
- ✅ Combinação automática quando necessário

## 🎯 Benefícios do Sistema

### **Para Supervisores**:
- ✅ **Sugestões Automáticas**: Sistema calcula melhor cobertura
- ✅ **Visibilidade Total**: Status de todos os funcionários
- ✅ **Compliance**: Respeita limites trabalhistas
- ✅ **Otimização**: Uso eficiente da equipe

### **Para Funcionários**:
- ✅ **Justiça**: Distribuição equilibrada de coberturas
- ✅ **Limites Respeitados**: Não excede 21 dias consecutivos
- ✅ **Transparência**: Sistema claro e justo

### **Para a Empresa**:
- ✅ **Eficiência**: Cobertura otimizada automaticamente
- ✅ **Conformidade**: Segue regras trabalhistas
- ✅ **Flexibilidade**: Equipe extra para casos especiais
- ✅ **Automação**: Reduz trabalho manual

## 🔧 Tecnologia

### **Backend**:
- Análise inteligente de disponibilidade
- Algoritmos de otimização de cobertura
- Validação automática de regras
- APIs RESTful completas

### **Frontend**:
- Interface intuitiva de análise
- Visualização de sugestões
- Aplicação de coberturas em um clique
- Feedback em tempo real

### **Integração**:
- Sistema totalmente integrado com escalas 14x14
- Funcionários regulares + equipe extra
- Validações automáticas
- Histórico completo

---

## 🎉 Resultado

O sistema agora oferece **cobertura inteligente e automática** que:

- **Respeita** as limitações da escala 14x14
- **Otimiza** o uso de funcionários regulares e equipe extra
- **Garante** cobertura completa para todas as férias
- **Facilita** o trabalho dos supervisores
- **Automatiza** decisões complexas de cobertura

Esta implementação torna o gerenciamento de coberturas de férias **completamente automatizado e inteligente**! 🚀
