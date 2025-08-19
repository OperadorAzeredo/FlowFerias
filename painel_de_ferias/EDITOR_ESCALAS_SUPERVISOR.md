# 📅 Editor de Escalas para Supervisor - Documentação

## 🎯 Visão Geral

O Editor de Escalas é uma ferramenta completa que permite ao supervisor gerenciar todas as escalas 14x14 dos funcionários de forma centralizada e intuitiva.

## 🚀 Funcionalidades

### ✅ **Recursos Implementados:**
- **Visualização por funcionário**: Lista todos os funcionários com estatísticas de escalas
- **Edição em tempo real**: Modificar datas, status e configurações de renovação
- **Validação automática**: Garante que as escalas tenham exatamente 14 dias
- **Criação de novas escalas**: Adicionar escalas futuras para qualquer funcionário
- **Remoção de escalas**: Deletar escalas desnecessárias ou incorretas
- **Salvamento em lote**: Salvar alterações de um funcionário ou todos de uma vez
- **Estatísticas dinâmicas**: Totais e contadores atualizados em tempo real

### 📊 **Painel de Estatísticas:**
- Total de funcionários
- Total de escalas cadastradas
- Escalas ativas
- Funcionários com escalas configuradas

### 🔧 **Funcionalidades de Edição:**
- **Data de embarque**: Início da escala de trabalho
- **Data de desembarque**: Fim da escala (14 dias após embarque)
- **Status**: Ativa ou Inativa
- **Renovação automática**: Configurar se a escala renova automaticamente

## 🎨 Interface

### **Navegação Principal:**
- Botão "Voltar ao Painel" - Retorna à página do supervisor
- Botão "Atualizar Dados" - Recarrega informações do servidor
- Botão "Salvar Todas as Alterações" - Salva modificações de todos os funcionários

### **Seleção de Funcionário:**
- Cards com informações do funcionário
- Contador de escalas totais e ativas
- Seleção visual clara do funcionário ativo

### **Editor de Escalas:**
- Lista numerada de todas as escalas do funcionário
- Campos editáveis para cada escala
- Botões de ação individuais (remover escala)
- Botão para adicionar novas escalas

## 🔌 APIs Utilizadas

### **Endpoints Existentes:**
- `GET /api/funcionarios` - Lista todos os funcionários
- `GET /api/escalas` - Lista todas as escalas
- `GET /api/escalas/funcionario/:id` - Escalas de um funcionário específico
- `POST /api/escalas` - Criar nova escala
- `PUT /api/escalas/:id` - Atualizar escala existente
- `DELETE /api/escalas/:id` - Remover escala

### **Novos Endpoints:**
- `PUT /api/escalas/funcionario/:funcionarioId/batch` - Atualizar múltiplas escalas
- `DELETE /api/escalas/funcionario/:funcionarioId/escala/:escalaId` - Remover escala específica

## 🛠️ Como Usar

### **1. Acesso:**
- Entre no painel do supervisor
- Clique em "📅 Editar Escalas dos Funcionários"
- Ou acesse diretamente: `http://localhost:3000/editar-escalas.html`

### **2. Seleção do Funcionário:**
- Visualize as estatísticas gerais no topo
- Clique no card do funcionário desejado
- O editor será aberto automaticamente

### **3. Edição de Escalas:**
- **Modificar datas**: Clique nos campos de data e altere
- **Alterar status**: Use o dropdown para Ativa/Inativa
- **Configurar renovação**: Escolha Auto/Manual
- **Adicionar escala**: Clique em "➕ Adicionar Nova Escala"
- **Remover escala**: Clique em "🗑️ Remover" na escala desejada

### **4. Salvamento:**
- **Individual**: Clique em "Salvar Escalas deste Funcionário"
- **Geral**: Use "💾 Salvar Todas as Alterações" no topo
- **Automático**: Sistema valida e aplica alterações instantaneamente

## ⚠️ Validações e Regras

### **Validação de Período:**
- Escalas devem ter exatamente 14 dias
- Sistema calcula automaticamente a diferença entre datas
- Alerta visual quando período é incorreto

### **Conflitos de Escala:**
- Sistema detecta sobreposições de datas
- Previne escalas conflitantes para o mesmo funcionário
- Valida datas antes do salvamento

### **Campos Obrigatórios:**
- Data de embarque e desembarque são obrigatórias
- Funcionário deve existir no sistema
- Datas devem estar em formato válido

## 🎯 Exemplos de Uso

### **Cenário 1: Novo Funcionário**
1. Selecione o funcionário sem escalas
2. Clique em "➕ Adicionar Nova Escala"
3. Configure data de embarque
4. Sistema calcula automaticamente o desembarque (+14 dias)
5. Salve as alterações

### **Cenário 2: Ajustar Escala Existente**
1. Selecione o funcionário
2. Localize a escala na lista
3. Modifique as datas necessárias
4. Sistema valida período de 14 dias
5. Salve individualmente ou em lote

### **Cenário 3: Planejamento Futuro**
1. Selecione funcionário com escalas ativas
2. Adicione múltiplas escalas futuras
3. Configure renovação automática
4. Sistema gerará escalas sequenciais
5. Salve todas as configurações

## 🚨 Tratamento de Erros

### **Erros Comuns:**
- **"Escala deve ter exatamente 14 dias"**: Ajuste as datas para período correto
- **"Já existe escala ativa no período"**: Verifique sobreposições de datas
- **"Funcionário não encontrado"**: Recarregue a página e tente novamente
- **"Erro ao conectar com servidor"**: Verifique se o backend está rodando

### **Mensagens de Feedback:**
- **Sucesso**: Confirmação verde com detalhes da operação
- **Erro**: Mensagem vermelha com descrição do problema
- **Loading**: Indica processamento em andamento

## 📱 Responsividade

### **Desktop (1200px+):**
- Layout em grid com múltiplas colunas
- Visualização completa de todos os elementos
- Navegação otimizada para mouse

### **Tablet (768px - 1199px):**
- Grid adaptativo com menos colunas
- Elementos reorganizados verticalmente
- Touch-friendly interface

### **Mobile (< 768px):**
- Layout em coluna única
- Botões expandidos para touch
- Navegação simplificada

## 🔄 Estados da Interface

### **Carregando:**
- Spinner de loading durante requisições
- Desabilita interações durante processamento
- Feedback visual de progresso

### **Erro:**
- Mensagens claras de erro
- Sugestões de correção
- Botão para tentar novamente

### **Sucesso:**
- Confirmação visual das operações
- Auto-ocultação das mensagens
- Atualização automática dos dados

## 🎨 Temas Visuais

### **Cores Principais:**
- **Supervisor**: #FF0000 (vermelho)
- **Primário**: #4facfe (azul)
- **Sucesso**: #48bb78 (verde)
- **Perigo**: #f56565 (vermelho claro)
- **Neutro**: #667eea (azul acinzentado)

### **Tipografia:**
- Font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Títulos: Bold, tamanhos variados
- Texto: Regular, bem espaçado
- Ícones: Emojis para identificação visual

## ✨ Recursos Avançados

### **Atalhos de Teclado:**
- Enter: Salvar escala atual
- Escape: Cancelar edição
- Tab: Navegar entre campos

### **Gestão de Estado:**
- Alterações mantidas localmente até salvamento
- Sincronização automática com servidor
- Recuperação de estado após reload

### **Performance:**
- Carregamento otimizado de dados
- Renderização eficiente de listas
- Requisições em lote para múltiplas operações

---

## 🏁 Conclusão

O Editor de Escalas oferece uma solução completa para gerenciamento de escalas 14x14, combinando facilidade de uso com funcionalidades avançadas. A interface intuitiva permite que supervisores gerenciem eficientemente as escalas de todos os funcionários, garantindo compliance com as regras trabalhistas e otimizando o planejamento operacional.

**Próximos passos sugeridos:**
- Integração com sistema de notificações  
- Relatórios de escalas em PDF
- Importação em lote via Excel
- Dashboard de analytics avançado
