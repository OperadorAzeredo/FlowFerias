# 🏖️ Sistema de Dias de Férias Flexível

## 📋 Nova Funcionalidade Implementada

O sistema agora permite que os funcionários escolham **quantos dias de férias** vão tirar, considerando a possibilidade de vender até 10 dias para a empresa.

### 🎯 Conceito Principal

**Combinação de Descanso:**
- **Férias Legais**: 20-30 dias (com opção de venda)
- **Folga da Escala**: 14 dias (da escala 14x14 normal)
- **Total**: Até 44 dias de descanso combinado

### 💰 Sistema de Venda de Dias

**Direitos do Funcionário:**
- ✅ **30 dias** de férias por ano (direito legal)
- ✅ Pode **vender até 10 dias** para a empresa
- ✅ Recebe **pagamento adicional** pelos dias vendidos
- ✅ Mantém no mínimo **20 dias** de férias

**Opções Disponíveis:**
```
30 dias = 0 dias vendidos (máximo descanso)
29 dias = 1 dia vendido
28 dias = 2 dias vendidos
...
21 dias = 9 dias vendidos
20 dias = 10 dias vendidos (máximo pagamento)
```

### 🔧 Funcionalidades Implementadas

#### 1. **Interface do Funcionário**
- **Seletor de Dias**: Dropdown com opções de 20-30 dias
- **Cálculo Automático**: Data final calculada automaticamente
- **Informações Visuais**: Mostra dias vendidos e valor estimado
- **Validação**: Confirma se período corresponde aos dias selecionados

#### 2. **Backend API**
- **Validação**: Verifica se dias estão entre 20-30
- **Cálculo**: Calcula automaticamente dias vendidos (30 - dias_selecionados)
- **Armazenamento**: Salva `diasFerias` e `diasVendidos` na solicitação
- **Consistência**: Valida se período informado corresponde aos dias

#### 3. **Interface do Supervisor**
- **Visualização Completa**: Mostra dias de férias e dias vendidos
- **Informações Financeiras**: Indica impacto no pagamento
- **Aprovação Informada**: Supervisor vê exatamente o que está aprovando

### 📊 Exemplo Prático

**Funcionário escolhe 25 dias de férias:**
- 🏖️ **Férias**: 25 dias de descanso
- 💰 **Venda**: 5 dias vendidos para a empresa  
- 💵 **Pagamento**: R$ 750 extra (5 × R$ 150)
- 📅 **Folga da Escala**: +14 dias (separadamente)
- 🎯 **Total de Descanso**: 39 dias no ano

### 🚀 Como Usar

#### **Para Funcionários:**
1. Acesse a tela de solicitação de férias
2. Escolha quantos dias quer tirar (20-30)
3. Selecione a data de início
4. Data final será calculada automaticamente
5. Veja quanto receberá pelos dias vendidos
6. Envie a solicitação

#### **Para Supervisores:**
1. Visualize todas as informações na solicitação
2. Veja dias de férias e dias vendidos
3. Aprove ou rejeite com base nas informações completas

### 🧪 Página de Teste

- **URL**: `http://localhost:3000/teste-dias-ferias.html`
- **Funcionalidades**: Teste completo do sistema
- **Simulação**: Criação e aprovação de solicitações
- **Calculadora**: Mostra benefícios em tempo real

### 📈 Benefícios

#### **Para Funcionários:**
- ✅ **Flexibilidade**: Escolhe quanto descansar vs. quanto ganhar
- ✅ **Transparência**: Vê exatamente o que receberá
- ✅ **Conveniência**: Cálculos automáticos
- ✅ **Combinação**: Férias + folga da escala 14x14

#### **Para Empresa:**
- ✅ **Controle Financeiro**: Sabe exatamente o custo
- ✅ **Planejamento**: Informações completas para aprovação
- ✅ **Flexibilidade**: Funcionários mais satisfeitos
- ✅ **Compliance**: Respeita direitos trabalhistas

### 🔧 Tecnologia

#### **Frontend:**
- Seletor inteligente de dias
- Cálculo automático de datas
- Validação em tempo real
- Interface responsiva

#### **Backend:**
- Validação robusta de dados
- Cálculo automático de dias vendidos
- API RESTful completa
- Armazenamento estruturado

#### **Integração:**
- Sistema integrado com escala 14x14
- Aprovação do supervisor
- Histórico completo
- Notificações automáticas

---

## 🎯 Resultado

O sistema agora oferece **máxima flexibilidade** para funcionários que trabalham na escala 14x14, permitindo:

- **Personalização** da quantidade de dias de férias
- **Monetização** de até 10 dias por ano
- **Combinação** com folgas da escala normal
- **Transparência total** no processo
- **Facilidade de uso** para todos os envolvidos

Esta implementação garante que os funcionários tenham controle total sobre seu tempo de descanso e benefícios financeiros! 🚀
