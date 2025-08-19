# 📋 Regras Atuais Implementadas - Sistema Simplificado

## 🎯 **Visão Geral Simplificada**

O sistema foi simplificado para **2 tipos de funcionários** apenas, removendo distinções desnecessárias:

## ⚖️ **Regras Atuais Implementadas**

### **1. 🟡 Funcionário Regular (Escala 14x14)**

#### **📍 Situação Normal**
- **Disponibilidade**: **Até 21 dias consecutivos**
- **Condição**: Funcionário NÃO está trabalhando 14 dias consecutivos
- **Uso**: Coberturas completas até 21 dias
- **Limitação**: `maximo_21_dias_regular`

#### **📍 Situação de Limitação**
- **Disponibilidade**: **Máximo 7 dias adicionais**
- **Condição**: Funcionário ESTÁ trabalhando 14 dias consecutivos
- **Razão**: Limite de 14 + 7 = 21 dias consecutivos máximo
- **Uso**: Apenas coberturas parciais
- **Limitação**: `maximo_7_dias_apos_14_trabalhados`

### **2. 🔵 Equipe Extra (Funcionários Dedicados)**

#### **📍 Situação Única**
- **Disponibilidade**: **Até 21 dias consecutivos**
- **Função**: Exclusivamente para coberturas de férias
- **Prioridade**: Preferencial para coberturas médias/longas
- **Uso**: Coberturas de qualquer tamanho até 21 dias
- **Limitação**: `maximo_21_dias_equipe_extra`

## 🧠 **Algoritmo de Cobertura Simplificado**

### **Estratégia 1: Funcionário Único (Preferencial)**
1. **Equipe Extra** (até 21 dias)
2. **Funcionário Regular** não limitado (até 21 dias)

### **Estratégia 2: Combinação Automática**
Para períodos > 21 dias:
1. **Funcionários limitados** (7 dias) primeiro
2. **Funcionários regulares** (até 21 dias) depois
3. **Equipe extra** (até 21 dias) para completar

## 📊 **Matriz de Capacidades**

| Tipo de Funcionário | Situação | Dias Máximos | Uso |
|---------------------|----------|--------------|-----|
| **Regular** | Normal | **21 dias** | Cobertura completa |
| **Regular** | Trabalhando | **7 dias** | Cobertura parcial |
| **Equipe Extra** | Sempre | **21 dias** | Cobertura preferencial |

## 🔍 **Como o Sistema Identifica**

### **Funcionário Regular**
```javascript
if (funcionario.equipe === 'regular') {
  if (status.status === 'trabalhando') {
    diasMaximos = 7; // Limitado
  } else {
    diasMaximos = 21; // Normal
  }
}
```

### **Equipe Extra**
```javascript
if (funcionario.equipe === 'extra') {
  diasMaximos = 21; // Sempre 21 dias
}
```

## 📈 **Cenários Práticos**

### **≤ 7 dias**: Qualquer funcionário
### **8-21 dias**: Funcionários regulares normais ou equipe extra
### **22+ dias**: Combinação obrigatória de múltiplos funcionários

## 🎯 **Benefícios da Simplificação**

### **✅ Clareza**
- Apenas 2 tipos de funcionários
- Regras mais simples de entender
- Menos complexidade no código

### **✅ Eficiência**
- Algoritmo mais rápido
- Menos verificações condicionais
- Manutenção mais fácil

### **✅ Funcionalidade**
- Mantém toda a funcionalidade anterior
- Respeita os mesmos limites trabalhistas
- Garante cobertura completa

## 🔧 **Estrutura Técnica Atual**

### **Tipos de Cobertura Retornados**
- `regular_limitado`: Funcionário regular trabalhando (7 dias)
- `regular`: Funcionário regular normal (até 21 dias)
- `equipe_extra`: Funcionário da equipe extra (até 21 dias)

### **Status de Funcionário**
- `trabalhando`: Limitado a 7 dias adicionais
- `folga` ou `disponivel`: Pode trabalhar até 21 dias (tratados igualmente)

## 🎉 **Resultado da Simplificação**

O sistema agora tem **regras mais claras** e **implementação mais simples**, mantendo toda a funcionalidade de cobertura inteligente:

### **2 Tipos de Funcionários**
1. **Regular**: 7 ou 21 dias (dependendo se está trabalhando)
2. **Equipe Extra**: Sempre 21 dias

### **Limite Universal: 21 Dias Consecutivos**
- Nenhum funcionário pode exceder 21 dias
- Combinações automáticas para períodos maiores
- Compliance trabalhista total

### **Algoritmo Otimizado**
- Prioriza soluções com menos funcionários
- Usa equipe extra preferencialmente
- Combina automaticamente quando necessário

**Status**: ✅ **SIMPLIFICADO E FUNCIONAL**
