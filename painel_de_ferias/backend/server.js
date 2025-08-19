const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3002', 'http://127.0.0.1:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Middleware para log de todas as requisições
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
  console.error('❌ Erro global capturado:', err);
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    detalhes: err.message,
    timestamp: new Date().toISOString()
  });
});

// Base de dados em memória (simulação)
let funcionarios = [
  { id: 1, nome: 'João Silva', sapid: '12345', senha: 'func123', email: 'joao@empresa.com', cargo: 'Desenvolvedor', equipe: 'regular', tipo: 'funcionario', departamento: 'TI' },
  { id: 2, nome: 'Maria Santos', sapid: '98765', senha: 'super123', email: 'maria@empresa.com', cargo: 'Supervisor', equipe: 'regular', tipo: 'supervisor', departamento: 'RH' },
  { id: 3, nome: 'Pedro Costa', sapid: '11122', senha: 'func456', email: 'pedro@empresa.com', cargo: 'Designer', equipe: 'regular', tipo: 'funcionario', departamento: 'Design' },
  { id: 4, nome: 'Ana Lima', sapid: '55566', senha: 'func789', email: 'ana@empresa.com', cargo: 'Gerente', equipe: 'regular', tipo: 'funcionario', departamento: 'Vendas' },
  // Funcionários da equipe extra (para cobertura de férias)
  { id: 5, nome: 'Carlos Extra', sapid: '77777', senha: 'extra123', email: 'carlos@empresa.com', cargo: 'Substituto', equipe: 'extra', tipo: 'funcionario', departamento: 'Operações' },
  { id: 6, nome: 'Julia Extra', sapid: '88888', senha: 'extra456', email: 'julia@empresa.com', cargo: 'Substituto', equipe: 'extra', tipo: 'funcionario', departamento: 'Operações' },
  { id: 7, nome: 'Roberto Extra', sapid: '99999', senha: 'extra789', email: 'roberto@empresa.com', cargo: 'Substituto', equipe: 'extra', tipo: 'funcionario', departamento: 'Operações' }
];

let solicitacoesFerias = [
  {
    id: 1,
    funcionarioId: 1,
    funcionarioNome: 'João Silva',
    dataInicio: '2025-08-01',
    dataFim: '2025-08-15',
    diasFerias: 30,
    diasVendidos: 0,
    motivo: 'Férias de verão',
    status: 'pendente',
    dataSolicitacao: '2025-07-20',
    coberturaId: null,
    coberturaNome: null
  }
];

let coberturasFerias = [
  // Estrutura: { 
  //   id: 1, 
  //   solicitacaoId: 1, 
  //   coberturas: [
  //     { funcionarioId: 2, funcionarioNome: 'Maria Santos', dataInicio: '2025-08-01', dataFim: '2025-08-07', diasCobertura: 7, tipoCobertura: 'regular_limitado' },
  //     { funcionarioId: 5, funcionarioNome: 'Carlos Extra', dataInicio: '2025-08-08', dataFim: '2025-08-15', diasCobertura: 8, tipoCobertura: 'equipe_extra' }
  //   ],
  //   status: 'completa' | 'parcial' | 'pendente'
  // }
];

// Escalas 14x14 dos funcionários
let escalas14x14 = [
  // Exemplo: { id: 1, funcionarioId: 1, dataEmbarque: '2025-07-01', dataDesembarque: '2025-07-15', ativo: true, renovacaoAutomatica: true }
];

// Configurações de renovação automática por funcionário
let configRenovacao = [
  // Exemplo: { funcionarioId: 1, renovacaoAutomatica: true }
];

let proximoId = 2;
let proximoCoberturaId = 1;
let proximoEscalaId = 1;

// Função para verificar e renovar escalas automaticamente
function verificarRenovacaoEscalas() {
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  
  escalas14x14.forEach(escala => {
    if (!escala.ativo) return;
    
    const dataDesembarque = new Date(escala.dataDesembarque);
    const configFuncionario = configRenovacao.find(c => c.funcionarioId === escala.funcionarioId);
    
    // Se a escala termina amanhã e tem renovação automática ativa
    if (dataDesembarque.toDateString() === amanha.toDateString() && 
        configFuncionario && configFuncionario.renovacaoAutomatica) {
      
      // Verifica se já não existe uma próxima escala
      const proximaEscalaExiste = escalas14x14.some(e => 
        e.funcionarioId === escala.funcionarioId && 
        e.ativo && 
        new Date(e.dataEmbarque) > dataDesembarque
      );
      
      if (!proximaEscalaExiste) {
        // Calcula próximo embarque (após 14 dias de folga)
        const proximoEmbarque = new Date(dataDesembarque);
        proximoEmbarque.setDate(dataDesembarque.getDate() + 15); // 14 dias de folga + 1
        
        const proximoDesembarque = new Date(proximoEmbarque);
        proximoDesembarque.setDate(proximoEmbarque.getDate() + 13); // 14 dias de trabalho
        
        const novaEscala = {
          id: proximoEscalaId++,
          funcionarioId: escala.funcionarioId,
          funcionarioNome: escala.funcionarioNome,
          dataEmbarque: proximoEmbarque.toISOString().split('T')[0],
          dataDesembarque: proximoDesembarque.toISOString().split('T')[0],
          ativo: true,
          renovacaoAutomatica: true,
          dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        escalas14x14.push(novaEscala);
        console.log(`✅ Escala renovada automaticamente para ${escala.funcionarioNome} - Próximo embarque: ${novaEscala.dataEmbarque}`);
      }
    }
  });
}

// Executar verificação de renovação a cada hora
setInterval(verificarRenovacaoEscalas, 60 * 60 * 1000);

// Executar uma vez ao iniciar o servidor
setTimeout(verificarRenovacaoEscalas, 5000);

// Função para verificar se funcionário está em período de trabalho ou folga
function verificarStatusFuncionario(funcionarioId, dataVerificacao) {
  const escalas = escalas14x14.filter(e => e.funcionarioId === funcionarioId && e.ativo);
  const dataCheck = new Date(dataVerificacao);
  
  for (const escala of escalas) {
    const embarque = new Date(escala.dataEmbarque);
    const desembarque = new Date(escala.dataDesembarque);
    
    // Se está no período de trabalho
    if (dataCheck >= embarque && dataCheck <= desembarque) {
      const diasTrabalhados = Math.ceil((dataCheck - embarque) / (1000 * 60 * 60 * 24)) + 1;
      return {
        status: 'trabalhando',
        diasTrabalhados,
        diasRestantes: 14 - diasTrabalhados,
        dataDesembarque: escala.dataDesembarque,
        podeTrabalharMais: diasTrabalhados <= 7 // Só pode trabalhar até 7 dias extras se já trabalhou 14
      };
    }
    
    // Verificar se está em folga (após desembarque)
    const inicioFolga = new Date(desembarque);
    inicioFolga.setDate(desembarque.getDate() + 1);
    
    const fimFolga = new Date(desembarque);
    fimFolga.setDate(desembarque.getDate() + 14);
    
    if (dataCheck >= inicioFolga && dataCheck <= fimFolga) {
      const diasFolga = Math.ceil((dataCheck - inicioFolga) / (1000 * 60 * 60 * 24)) + 1;
      return {
        status: 'folga',
        diasFolga,
        diasFolgaRestantes: 14 - diasFolga,
        dataInicioFolga: inicioFolga.toISOString().split('T')[0],
        dataFimFolga: fimFolga.toISOString().split('T')[0],
        podeTrabalharMais: 7 // Funcionário em folga pode trabalhar até 7 dias extras
      };
    }
  }
  
  return {
    status: 'disponivel',
    podeTrabalharMais: 14 // Funcionário disponível pode trabalhar período completo
  };
}

// Função para calcular disponibilidade de cobertura
function calcularDisponibilidadeCobertura(funcionarioId, dataInicio, dataFim) {
  const funcionario = funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) return null;
  
  const diasNecessarios = Math.ceil((new Date(dataFim) - new Date(dataInicio)) / (1000 * 60 * 60 * 24)) + 1;
  
  // Funcionários da equipe extra podem cobrir até 21 dias consecutivos
  if (funcionario.equipe === 'extra') {
    const diasMaximosExtra = 21; // Limite trabalhista
    return {
      funcionarioId,
      funcionarioNome: funcionario.nome,
      equipe: 'extra',
      diasDisponiveis: Math.min(diasMaximosExtra, diasNecessarios),
      diasMaximos: diasMaximosExtra,
      diasNecessarios,
      limitacao: 'maximo_21_dias_equipe_extra',
      podeCobrirCompleto: diasNecessarios <= diasMaximosExtra,
      statusAtual: 'disponivel_equipe_extra'
    };
  }
  
  // Para funcionários regulares, verificar status na data de início
  const status = verificarStatusFuncionario(funcionarioId, dataInicio);
  let diasMaximos = 0;
  let limitacao = '';
  
  if (status.status === 'trabalhando') {
    // Funcionário trabalhando pode trabalhar mais 7 dias (máximo 21 consecutivos)
    diasMaximos = 7;
    limitacao = 'maximo_7_dias_apos_14_trabalhados';
  } else {
    // Funcionário regular (não trabalhando) pode trabalhar até 21 dias
    diasMaximos = 21;
    limitacao = 'maximo_21_dias_regular';
  }
  
  return {
    funcionarioId,
    funcionarioNome: funcionario.nome,
    equipe: 'regular',
    statusAtual: status.status,
    diasDisponiveis: Math.min(diasMaximos, diasNecessarios),
    diasMaximos: diasMaximos,
    diasNecessarios,
    limitacao,
    podeCobrirCompleto: diasMaximos >= diasNecessarios,
    diasTrabalhadosAtualmente: status.diasTrabalhados || 0
  };
}

// Função para sugerir cobertura otimizada
function sugerirCobertura(solicitacaoId) {
  const solicitacao = solicitacoesFerias.find(s => s.id === solicitacaoId);
  if (!solicitacao) return null;
  
  const diasTotal = Math.ceil((new Date(solicitacao.dataFim) - new Date(solicitacao.dataInicio)) / (1000 * 60 * 60 * 24)) + 1;
  const funcionariosDisponiveis = funcionarios.filter(f => f.id !== solicitacao.funcionarioId);
  
  const sugestoes = [];
  
  // Verificar cada funcionário
  funcionariosDisponiveis.forEach(funcionario => {
    const disponibilidade = calcularDisponibilidadeCobertura(
      funcionario.id, 
      solicitacao.dataInicio, 
      solicitacao.dataFim
    );
    
    if (disponibilidade && disponibilidade.diasDisponiveis > 0) {
      sugestoes.push(disponibilidade);
    }
  });
  
  // Separar por equipe e ordenar por disponibilidade
  const equipeExtra = sugestoes.filter(s => s.equipe === 'extra').sort((a, b) => b.diasDisponiveis - a.diasDisponiveis);
  const equipeRegular = sugestoes.filter(s => s.equipe === 'regular').sort((a, b) => b.diasDisponiveis - a.diasDisponiveis);
  
  return {
    solicitacaoId,
    diasTotal,
    equipeExtra,
    equipeRegular,
    sugestaoOtima: gerarSugestaoOtima(equipeExtra, equipeRegular, diasTotal, solicitacao)
  };
}

// Função para gerar sugestão ótima de cobertura
function gerarSugestaoOtima(equipeExtra, equipeRegular, diasTotal, solicitacao) {
  const dataInicio = new Date(solicitacao.dataInicio);
  
  // Estratégia 1: Tentar com um único funcionário da equipe extra
  const funcionarioExtra = equipeExtra.find(f => f.podeCobrirCompleto);
  if (funcionarioExtra) {
    return [{
      funcionarioId: funcionarioExtra.funcionarioId,
      funcionarioNome: funcionarioExtra.funcionarioNome,
      dataInicio: solicitacao.dataInicio,
      dataFim: solicitacao.dataFim,
      diasCobertura: diasTotal,
      tipoCobertura: 'equipe_extra',
      observacao: 'Cobertura completa com funcionário da equipe extra'
    }];
  }
  
  // Estratégia 2: Tentar com um único funcionário regular (se pode cobrir completo)
  const funcionarioRegularCompleto = equipeRegular.find(f => f.podeCobrirCompleto);
  if (funcionarioRegularCompleto) {
    return [{
      funcionarioId: funcionarioRegularCompleto.funcionarioId,
      funcionarioNome: funcionarioRegularCompleto.funcionarioNome,
      dataInicio: solicitacao.dataInicio,
      dataFim: solicitacao.dataFim,
      diasCobertura: diasTotal,
      tipoCobertura: 'regular_completo',
      observacao: `Cobertura completa - funcionário pode trabalhar até ${funcionarioRegularCompleto.diasMaximos} dias`
    }];
  }
  
  // Estratégia 3: Combinar funcionários para cobrir todo o período
  let diasRestantes = diasTotal;
  let dataAtual = new Date(dataInicio);
  const coberturasCombinadas = [];
  
  // Primeiro, usar funcionários regulares com limitação (máximo 7 dias)
  const funcionariosLimitados = equipeRegular.filter(f => f.diasMaximos === 7 && f.diasDisponiveis > 0);
  for (const funcionario of funcionariosLimitados) {
    if (diasRestantes <= 0) break;
    
    const diasCobertura = Math.min(funcionario.diasDisponiveis, diasRestantes);
    const dataFim = new Date(dataAtual);
    dataFim.setDate(dataAtual.getDate() + diasCobertura - 1);
    
    coberturasCombinadas.push({
      funcionarioId: funcionario.funcionarioId,
      funcionarioNome: funcionario.funcionarioNome,
      dataInicio: dataAtual.toISOString().split('T')[0],
      dataFim: dataFim.toISOString().split('T')[0],
      diasCobertura: diasCobertura,
      tipoCobertura: 'regular_limitado',
      observacao: `Limitado a ${funcionario.diasMaximos} dias (${funcionario.limitacao})`
    });
    
    diasRestantes -= diasCobertura;
    dataAtual = new Date(dataFim);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }
  
  // Segundo, usar funcionários regulares (até 21 dias)
  const funcionariosRegulares = equipeRegular.filter(f => f.diasMaximos > 7 && f.diasDisponiveis > 0);
  for (const funcionario of funcionariosRegulares) {
    if (diasRestantes <= 0) break;
    
    const diasCobertura = Math.min(funcionario.diasDisponiveis, diasRestantes);
    const dataFim = new Date(dataAtual);
    dataFim.setDate(dataAtual.getDate() + diasCobertura - 1);
    
    coberturasCombinadas.push({
      funcionarioId: funcionario.funcionarioId,
      funcionarioNome: funcionario.funcionarioNome,
      dataInicio: dataAtual.toISOString().split('T')[0],
      dataFim: dataFim.toISOString().split('T')[0],
      diasCobertura: diasCobertura,
      tipoCobertura: 'regular',
      observacao: `Funcionário regular - até ${funcionario.diasMaximos} dias`
    });
    
    diasRestantes -= diasCobertura;
    dataAtual = new Date(dataFim);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }
  
  // Terceiro, usar equipe extra para cobrir dias restantes (até 21 dias cada)
  for (const funcionario of equipeExtra) {
    if (diasRestantes <= 0) break;
    
    const diasCobertura = Math.min(funcionario.diasDisponiveis, diasRestantes); // Limitado a 21 dias
    const dataFim = new Date(dataAtual);
    dataFim.setDate(dataAtual.getDate() + diasCobertura - 1);
    
    coberturasCombinadas.push({
      funcionarioId: funcionario.funcionarioId,
      funcionarioNome: funcionario.funcionarioNome,
      dataInicio: dataAtual.toISOString().split('T')[0],
      dataFim: dataFim.toISOString().split('T')[0],
      diasCobertura: diasCobertura,
      tipoCobertura: 'equipe_extra',
      observacao: `Equipe extra - máximo ${funcionario.diasMaximos} dias`
    });
    
    diasRestantes -= diasCobertura;
    dataAtual = new Date(dataFim);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }
  
  // Se conseguiu cobrir todo o período, retorna a combinação
  if (diasRestantes <= 0 && coberturasCombinadas.length > 0) {
    return coberturasCombinadas;
  }
  
  // Se não conseguiu cobrir completamente, retorna null
  return null;
}

// Função para verificar conflito de férias no mesmo mês
function verificarConflitoMes(dataInicio, dataFim, funcionarioId = null) {
  const mesInicio = new Date(dataInicio).getMonth();
  const anoInicio = new Date(dataInicio).getFullYear();
  const mesFim = new Date(dataFim).getMonth();
  const anoFim = new Date(dataFim).getFullYear();

  return solicitacoesFerias.some(solicitacao => {
    if (funcionarioId && solicitacao.funcionarioId === funcionarioId) {
      return false; // Ignora as próprias solicitações
    }
    
    if (solicitacao.status !== 'aprovada') {
      return false; // Só considera férias aprovadas
    }

    const mesInicioExistente = new Date(solicitacao.dataInicio).getMonth();
    const anoInicioExistente = new Date(solicitacao.dataInicio).getFullYear();
    const mesFimExistente = new Date(solicitacao.dataFim).getMonth();
    const anoFimExistente = new Date(solicitacao.dataFim).getFullYear();

    // Verifica se há sobreposição de meses
    for (let ano = anoInicio; ano <= anoFim; ano++) {
      for (let mes = (ano === anoInicio ? mesInicio : 0); mes <= (ano === anoFim ? mesFim : 11); mes++) {
        for (let anoExist = anoInicioExistente; anoExist <= anoFimExistente; anoExist++) {
          for (let mesExist = (anoExist === anoInicioExistente ? mesInicioExistente : 0); mesExist <= (anoExist === anoFimExistente ? mesFimExistente : 11); mesExist++) {
            if (ano === anoExist && mes === mesExist) {
              return true;
            }
          }
        }
      }
    }
    return false;
  });
}

// Rotas para funcionários
app.get('/api/funcionarios', (req, res) => {
  res.json(funcionarios);
});

app.get('/api/funcionarios/:id', (req, res) => {
  const funcionario = funcionarios.find(f => f.id === parseInt(req.params.id));
  if (!funcionario) {
    return res.status(404).json({ erro: 'Funcionário não encontrado' });
  }
  res.json(funcionario);
});

// Rotas para solicitações de férias
app.get('/api/ferias', (req, res) => {
  res.json(solicitacoesFerias);
});

app.get('/api/ferias/funcionario/:funcionarioId', (req, res) => {
  const funcionarioId = parseInt(req.params.funcionarioId);
  const feriasFuncionario = solicitacoesFerias.filter(f => f.funcionarioId === funcionarioId);
  res.json(feriasFuncionario);
});

app.post('/api/ferias', (req, res) => {
  const { funcionarioId, dataInicio, dataFim, diasFerias, motivo } = req.body;

  // Validações
  if (!funcionarioId || !dataInicio || !dataFim || !diasFerias || !motivo) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  // Validar quantidade de dias
  const diasFeriasNum = parseInt(diasFerias);
  if (diasFeriasNum < 20 || diasFeriasNum > 30) {
    return res.status(400).json({ erro: 'Quantidade de dias deve estar entre 20 e 30' });
  }

  const funcionario = funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) {
    return res.status(404).json({ erro: 'Funcionário não encontrado' });
  }

  // Verificar se o período corresponde à quantidade de dias informada
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const diferencaDias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24)) + 1;
  
  if (diferencaDias !== diasFeriasNum) {
    return res.status(400).json({ 
      erro: `O período selecionado tem ${diferencaDias} dias, mas você informou ${diasFeriasNum} dias` 
    });
  }

  // Verifica se a data de início é anterior à data de fim
  if (new Date(dataInicio) >= new Date(dataFim)) {
    return res.status(400).json({ erro: 'Data de início deve ser anterior à data de fim' });
  }

  // Verifica se há conflito de férias no mesmo mês
  if (verificarConflitoMes(dataInicio, dataFim)) {
    return res.status(400).json({ 
      erro: 'Já existe férias aprovadas para outro funcionário no mesmo mês' 
    });
  }

  const diasVendidos = 30 - diasFeriasNum;

  const novaSolicitacao = {
    id: proximoId++,
    funcionarioId,
    funcionarioNome: funcionario.nome,
    dataInicio,
    dataFim,
    diasFerias: diasFeriasNum,
    diasVendidos,
    motivo,
    status: 'pendente',
    dataSolicitacao: new Date().toISOString().split('T')[0]
  };

  solicitacoesFerias.push(novaSolicitacao);
  res.status(201).json(novaSolicitacao);
});

app.put('/api/ferias/:id/aprovar', (req, res) => {
  const id = parseInt(req.params.id);
  const solicitacao = solicitacoesFerias.find(s => s.id === id);

  if (!solicitacao) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  if (solicitacao.status !== 'pendente') {
    return res.status(400).json({ erro: 'Solicitação já foi processada' });
  }

  // Verifica conflito novamente antes de aprovar
  if (verificarConflitoMes(solicitacao.dataInicio, solicitacao.dataFim, solicitacao.funcionarioId)) {
    return res.status(400).json({ 
      erro: 'Não é possível aprovar: já existe férias aprovadas para outro funcionário no mesmo mês' 
    });
  }

  solicitacao.status = 'aprovada';
  res.json(solicitacao);
});

app.put('/api/ferias/:id/rejeitar', (req, res) => {
  const id = parseInt(req.params.id);
  const solicitacao = solicitacoesFerias.find(s => s.id === id);

  if (!solicitacao) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  if (solicitacao.status !== 'pendente') {
    return res.status(400).json({ erro: 'Solicitação já foi processada' });
  }

  solicitacao.status = 'rejeitada';
  res.json(solicitacao);
});

app.delete('/api/ferias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = solicitacoesFerias.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  solicitacoesFerias.splice(index, 1);
  res.status(204).send();
});

// Rota para cancelamento de solicitação pelo funcionário
app.put('/api/ferias/:id/cancelar', (req, res) => {
  const id = parseInt(req.params.id);
  const { funcionarioId } = req.body;

  const solicitacao = solicitacoesFerias.find(s => s.id === id);

  if (!solicitacao) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  // Verifica se o funcionário que está cancelando é o dono da solicitação
  if (solicitacao.funcionarioId !== funcionarioId) {
    return res.status(403).json({ erro: 'Você só pode cancelar suas próprias solicitações' });
  }

  // Só permite cancelar solicitações pendentes
  if (solicitacao.status !== 'pendente') {
    return res.status(400).json({ 
      erro: 'Não é possível cancelar esta solicitação. Apenas solicitações pendentes podem ser canceladas.' 
    });
  }

  // Remove a solicitação
  const index = solicitacoesFerias.findIndex(s => s.id === id);
  solicitacoesFerias.splice(index, 1);

  res.json({ 
    message: 'Solicitação cancelada com sucesso',
    solicitacaoCancelada: solicitacao
  });
});

// Rotas para Cobertura de Férias
app.get('/api/coberturas', (req, res) => {
  const coberturasComDetalhes = coberturasFerias.map(cobertura => {
    const solicitacao = solicitacoesFerias.find(s => s.id === cobertura.solicitacaoId);
    return {
      ...cobertura,
      solicitacao
    };
  });
  res.json(coberturasComDetalhes);
});

// Nova rota para sugestões de cobertura
app.get('/api/coberturas/sugestoes/:solicitacaoId', (req, res) => {
  const solicitacaoId = parseInt(req.params.solicitacaoId);
  const sugestoes = sugerirCobertura(solicitacaoId);
  
  if (!sugestoes) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }
  
  res.json(sugestoes);
});

// Rota para verificar disponibilidade de funcionário específico
app.get('/api/funcionarios/:id/disponibilidade', (req, res) => {
  const funcionarioId = parseInt(req.params.id);
  const { dataInicio, dataFim } = req.query;
  
  if (!dataInicio || !dataFim) {
    return res.status(400).json({ erro: 'dataInicio e dataFim são obrigatórios' });
  }
  
  const disponibilidade = calcularDisponibilidadeCobertura(funcionarioId, dataInicio, dataFim);
  
  if (!disponibilidade) {
    return res.status(404).json({ erro: 'Funcionário não encontrado' });
  }
  
  res.json(disponibilidade);
});

// Rota para listar funcionários por equipe
app.get('/api/funcionarios/equipe/:tipo', (req, res) => {
  const tipoEquipe = req.params.tipo; // 'regular' ou 'extra'
  const funcionariosPorEquipe = funcionarios.filter(f => f.equipe === tipoEquipe);
  res.json(funcionariosPorEquipe);
});

app.post('/api/coberturas', (req, res) => {
  const { solicitacaoId, coberturas } = req.body;

  if (!solicitacaoId || !coberturas || !Array.isArray(coberturas)) {
    return res.status(400).json({ erro: 'solicitacaoId e coberturas (array) são obrigatórios' });
  }

  const solicitacao = solicitacoesFerias.find(s => s.id === solicitacaoId);
  if (!solicitacao) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  if (solicitacao.status !== 'aprovada') {
    return res.status(400).json({ erro: 'Solicitação deve estar aprovada para definir cobertura' });
  }

  // Validar se as coberturas cobrem todo o período
  const diasSolicitacao = Math.ceil((new Date(solicitacao.dataFim) - new Date(solicitacao.dataInicio)) / (1000 * 60 * 60 * 24)) + 1;
  const diasCobertos = coberturas.reduce((total, c) => total + (c.diasCobertura || 0), 0);
  
  if (diasCobertos !== diasSolicitacao) {
    return res.status(400).json({ 
      erro: `Cobertura incompleta. Necessário: ${diasSolicitacao} dias, coberto: ${diasCobertos} dias` 
    });
  }

  // Validar disponibilidade de cada funcionário
  for (const cobertura of coberturas) {
    const disponibilidade = calcularDisponibilidadeCobertura(
      cobertura.funcionarioId, 
      cobertura.dataInicio, 
      cobertura.dataFim
    );
    
    if (!disponibilidade || disponibilidade.diasDisponiveis < cobertura.diasCobertura) {
      const funcionario = funcionarios.find(f => f.id === cobertura.funcionarioId);
      return res.status(400).json({ 
        erro: `${funcionario?.nome || 'Funcionário'} não tem disponibilidade suficiente para cobrir ${cobertura.diasCobertura} dias` 
      });
    }
  }

  // Verificar se já existe cobertura para esta solicitação
  const coberturaExistente = coberturasFerias.find(c => c.solicitacaoId === solicitacaoId);
  if (coberturaExistente) {
    return res.status(400).json({ erro: 'Já existe cobertura definida para esta solicitação' });
  }

  const novaCobertura = {
    id: proximoCoberturaId++,
    solicitacaoId,
    coberturas: coberturas.map(c => ({
      ...c,
      funcionarioNome: funcionarios.find(f => f.id === c.funcionarioId)?.nome || 'Desconhecido'
    })),
    status: 'completa',
    dataCriacao: new Date().toISOString().split('T')[0]
  };

  coberturasFerias.push(novaCobertura);

  // Atualizar solicitação com informação de cobertura
  solicitacao.coberturaId = novaCobertura.id;
  solicitacao.coberturaNome = coberturas.map(c => 
    funcionarios.find(f => f.id === c.funcionarioId)?.nome || 'Desconhecido'
  ).join(', ');

  res.status(201).json(novaCobertura);
});

// Rota para editar cobertura existente
app.put('/api/coberturas/:id', (req, res) => {
  const coberturaId = parseInt(req.params.id);
  const { coberturas } = req.body;

  if (!coberturas || !Array.isArray(coberturas)) {
    return res.status(400).json({ erro: 'coberturas (array) é obrigatório' });
  }

  const coberturaExistente = coberturasFerias.find(c => c.id === coberturaId);
  if (!coberturaExistente) {
    return res.status(404).json({ erro: 'Cobertura não encontrada' });
  }

  const solicitacao = solicitacoesFerias.find(s => s.id === coberturaExistente.solicitacaoId);
  if (!solicitacao) {
    return res.status(404).json({ erro: 'Solicitação não encontrada' });
  }

  // Validar se as coberturas cobrem todo o período
  const diasSolicitacao = Math.ceil((new Date(solicitacao.dataFim) - new Date(solicitacao.dataInicio)) / (1000 * 60 * 60 * 24)) + 1;
  const diasCobertos = coberturas.reduce((total, c) => total + (c.diasCobertura || 0), 0);
  
  if (diasCobertos !== diasSolicitacao) {
    return res.status(400).json({ 
      erro: `Cobertura incompleta. Necessário: ${diasSolicitacao} dias, coberto: ${diasCobertos} dias` 
    });
  }

  // Validar disponibilidade de cada funcionário
  for (const cobertura of coberturas) {
    const disponibilidade = calcularDisponibilidadeCobertura(
      cobertura.funcionarioId, 
      cobertura.dataInicio, 
      cobertura.dataFim
    );
    
    if (!disponibilidade || disponibilidade.diasDisponiveis < cobertura.diasCobertura) {
      const funcionario = funcionarios.find(f => f.id === cobertura.funcionarioId);
      return res.status(400).json({ 
        erro: `${funcionario?.nome || 'Funcionário'} não tem disponibilidade suficiente para cobrir ${cobertura.diasCobertura} dias` 
      });
    }
  }

  // Atualizar cobertura
  coberturaExistente.coberturas = coberturas.map(c => ({
    ...c,
    funcionarioNome: funcionarios.find(f => f.id === c.funcionarioId)?.nome || 'Desconhecido'
  }));

  // Atualizar solicitação com nova informação de cobertura
  solicitacao.coberturaNome = coberturas.map(c => 
    funcionarios.find(f => f.id === c.funcionarioId)?.nome || 'Desconhecido'
  ).join(', ');

  res.json(coberturaExistente);
});

// ===== ROTAS PARA ESCALAS 14x14 =====

// Listar escalas de um funcionário
app.get('/api/escalas/funcionario/:funcionarioId', (req, res) => {
  try {
    console.log('📋 Solicitação de escalas do funcionário:', req.params.funcionarioId);
    
    const funcionarioId = parseInt(req.params.funcionarioId);
    
    if (isNaN(funcionarioId)) {
      console.log('❌ ID do funcionário inválido:', req.params.funcionarioId);
      return res.status(400).json({ erro: 'ID do funcionário deve ser um número válido' });
    }
    
    // Verificar se o funcionário existe
    const funcionario = funcionarios.find(f => f.id === funcionarioId);
    if (!funcionario) {
      console.log('❌ Funcionário não encontrado com ID:', funcionarioId);
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }
    
    const escalasDoFuncionario = escalas14x14.filter(e => e.funcionarioId === funcionarioId);
    
    console.log('✅ Escalas encontradas para funcionário', funcionario.nome + ':', escalasDoFuncionario.length);
    console.log('📊 Escalas:', escalasDoFuncionario);
    
    res.json(escalasDoFuncionario);
    
  } catch (error) {
    console.error('❌ Erro ao buscar escalas do funcionário:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao buscar escalas',
      detalhes: error.message 
    });
  }
});

// Listar todas as escalas
app.get('/api/escalas', (req, res) => {
  try {
    console.log('📋 Solicitação de todas as escalas');
    
    const escalasComNomes = escalas14x14.map(escala => {
      const funcionario = funcionarios.find(f => f.id === escala.funcionarioId);
      return {
        ...escala,
        funcionarioNome: funcionario ? funcionario.nome : 'Funcionário não encontrado'
      };
    });
    
    console.log('✅ Total de escalas encontradas:', escalasComNomes.length);
    console.log('📊 Escalas:', escalasComNomes);
    
    res.json(escalasComNomes);
    
  } catch (error) {
    console.error('❌ Erro ao buscar todas as escalas:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao buscar escalas',
      detalhes: error.message 
    });
  }
});

// Cadastrar nova escala
app.post('/api/escalas', (req, res) => {
  try {
    console.log('📝 Nova solicitação de escala recebida:', req.body);
    
    const { funcionarioId, dataEmbarque, dataDesembarque } = req.body;

    // Validações
    if (!funcionarioId || !dataEmbarque || !dataDesembarque) {
      console.log('❌ Campos obrigatórios faltando:', { funcionarioId, dataEmbarque, dataDesembarque });
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Converter funcionarioId para número se vier como string
    const funcionarioIdNum = parseInt(funcionarioId);
    if (isNaN(funcionarioIdNum)) {
      console.log('❌ ID do funcionário inválido:', funcionarioId);
      return res.status(400).json({ erro: 'ID do funcionário deve ser um número válido' });
    }

    const funcionario = funcionarios.find(f => f.id === funcionarioIdNum);
    if (!funcionario) {
      console.log('❌ Funcionário não encontrado com ID:', funcionarioIdNum);
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    const embarque = new Date(dataEmbarque);
    const desembarque = new Date(dataDesembarque);

    // Validar se as datas são válidas
    if (isNaN(embarque.getTime()) || isNaN(desembarque.getTime())) {
      console.log('❌ Datas inválidas:', { dataEmbarque, dataDesembarque });
      return res.status(400).json({ erro: 'Datas de embarque e desembarque devem ser válidas' });
    }

    // Validar se a data de embarque é anterior à data de desembarque
    if (embarque >= desembarque) {
      console.log('❌ Data de embarque deve ser anterior à data de desembarque');
      return res.status(400).json({ erro: 'Data de embarque deve ser anterior à data de desembarque' });
    }

    // Validar se o período é de 14 dias
    const diferencaDias = Math.ceil((desembarque - embarque) / (1000 * 60 * 60 * 24));
    if (diferencaDias !== 13) { // 13 dias de diferença = 14 dias no total (incluindo o primeiro dia)
      console.log('❌ Período inválido:', diferencaDias + 1, 'dias');
      return res.status(400).json({ 
        erro: 'A escala deve ter exatamente 14 dias. Período informado: ' + (diferencaDias + 1) + ' dias' 
      });
    }

    // Verificar conflito de escalas para o mesmo funcionário
    const conflito = escalas14x14.find(escala => 
      escala.funcionarioId === funcionarioIdNum &&
      escala.ativo &&
      (
        (embarque >= new Date(escala.dataEmbarque) && embarque <= new Date(escala.dataDesembarque)) ||
        (desembarque >= new Date(escala.dataEmbarque) && desembarque <= new Date(escala.dataDesembarque)) ||
        (embarque <= new Date(escala.dataEmbarque) && desembarque >= new Date(escala.dataDesembarque))
      )
    );

    if (conflito) {
      console.log('❌ Conflito de escala encontrado:', conflito);
      return res.status(400).json({ 
        erro: 'Já existe uma escala ativa para este funcionário no período informado' 
      });
    }

    const novaEscala = {
      id: proximoEscalaId++,
      funcionarioId: funcionarioIdNum,
      funcionarioNome: funcionario.nome,
      dataEmbarque,
      dataDesembarque,
      ativo: true,
      renovacaoAutomatica: true,
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    escalas14x14.push(novaEscala);
    
    // Criar ou atualizar configuração de renovação automática para o funcionário
    let configFuncionario = configRenovacao.find(c => c.funcionarioId === funcionarioIdNum);
    if (!configFuncionario) {
      configRenovacao.push({
        funcionarioId: funcionarioIdNum,
        renovacaoAutomatica: true
      });
    }
    
    console.log('✅ Escala criada com sucesso:', novaEscala);
    res.status(201).json(novaEscala);
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar escala:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao cadastrar escala',
      detalhes: error.message 
    });
  }
});

// Atualizar escala
app.put('/api/escalas/:id', (req, res) => {
  try {
    console.log('🔄 Atualização de escala solicitada:', { id: req.params.id, body: req.body });
    
    const id = parseInt(req.params.id);
    const { dataEmbarque, dataDesembarque, ativo } = req.body;

    if (isNaN(id)) {
      console.log('❌ ID da escala inválido:', req.params.id);
      return res.status(400).json({ erro: 'ID da escala deve ser um número válido' });
    }

    const escala = escalas14x14.find(e => e.id === id);
    if (!escala) {
      console.log('❌ Escala não encontrada com ID:', id);
      return res.status(404).json({ erro: 'Escala não encontrada' });
    }

    if (dataEmbarque && dataDesembarque) {
      const embarque = new Date(dataEmbarque);
      const desembarque = new Date(dataDesembarque);
      
      // Validar se as datas são válidas
      if (isNaN(embarque.getTime()) || isNaN(desembarque.getTime())) {
        console.log('❌ Datas inválidas na atualização:', { dataEmbarque, dataDesembarque });
        return res.status(400).json({ erro: 'Datas de embarque e desembarque devem ser válidas' });
      }

      // Validar se a data de embarque é anterior à data de desembarque
      if (embarque >= desembarque) {
        console.log('❌ Data de embarque deve ser anterior à data de desembarque');
        return res.status(400).json({ erro: 'Data de embarque deve ser anterior à data de desembarque' });
      }
      
      const diferencaDias = Math.ceil((desembarque - embarque) / (1000 * 60 * 60 * 24));
      
      if (diferencaDias !== 13) {
        console.log('❌ Período inválido na atualização:', diferencaDias + 1, 'dias');
        return res.status(400).json({ 
          erro: 'A escala deve ter exatamente 14 dias. Período informado: ' + (diferencaDias + 1) + ' dias' 
        });
      }

      escala.dataEmbarque = dataEmbarque;
      escala.dataDesembarque = dataDesembarque;
    }

    if (typeof ativo !== 'undefined') {
      escala.ativo = ativo;
    }

    console.log('✅ Escala atualizada com sucesso:', escala);
    res.json(escala);
    
  } catch (error) {
    console.error('❌ Erro ao atualizar escala:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao atualizar escala',
      detalhes: error.message 
    });
  }
});

// Desativar escala
app.delete('/api/escalas/:id', (req, res) => {
  try {
    console.log('🗑️ Solicitação de desativação de escala:', req.params.id);
    
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      console.log('❌ ID da escala inválido:', req.params.id);
      return res.status(400).json({ erro: 'ID da escala deve ser um número válido' });
    }
    
    const escala = escalas14x14.find(e => e.id === id);
    
    if (!escala) {
      console.log('❌ Escala não encontrada com ID:', id);
      return res.status(404).json({ erro: 'Escala não encontrada' });
    }

    escala.ativo = false;
    
    console.log('✅ Escala desativada com sucesso:', escala);
    res.json({ message: 'Escala desativada com sucesso', escala });
    
  } catch (error) {
    console.error('❌ Erro ao desativar escala:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao desativar escala',
      detalhes: error.message 
    });
  }
});

// Configuração de renovação automática
app.get('/api/renovacao/:funcionarioId', (req, res) => {
  const funcionarioId = parseInt(req.params.funcionarioId);
  let config = configRenovacao.find(c => c.funcionarioId === funcionarioId);
  
  if (!config) {
    config = { funcionarioId, renovacaoAutomatica: true };
    configRenovacao.push(config);
  }
  
  res.json(config);
});

app.put('/api/renovacao/:funcionarioId', (req, res) => {
  const funcionarioId = parseInt(req.params.funcionarioId);
  const { renovacaoAutomatica } = req.body;
  
  let config = configRenovacao.find(c => c.funcionarioId === funcionarioId);
  
  if (!config) {
    config = {
      funcionarioId,
      renovacaoAutomatica: renovacaoAutomatica !== false
    };
    configRenovacao.push(config);
  } else {
    config.renovacaoAutomatica = renovacaoAutomatica !== false;
  }
  
  res.json(config);
});

// Forçar verificação manual de renovação (para teste)
app.post('/api/verificar-renovacao', (req, res) => {
  verificarRenovacaoEscalas();
  res.json({ message: 'Verificação de renovação executada' });
});

// Rota para atualizar múltiplas escalas (para supervisor)
app.put('/api/escalas/funcionario/:funcionarioId/batch', (req, res) => {
  const funcionarioId = parseInt(req.params.funcionarioId);
  const { escalas } = req.body;

  if (!escalas || !Array.isArray(escalas)) {
    return res.status(400).json({ erro: 'Array de escalas é obrigatório' });
  }

  const funcionario = funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) {
    return res.status(404).json({ erro: 'Funcionário não encontrado' });
  }

  // Validar todas as escalas antes de aplicar mudanças
  for (const escalaData of escalas) {
    if (escalaData.dataEmbarque && escalaData.dataDesembarque) {
      const embarque = new Date(escalaData.dataEmbarque);
      const desembarque = new Date(escalaData.dataDesembarque);
      const diferencaDias = Math.ceil((desembarque - embarque) / (1000 * 60 * 60 * 24));
      
      if (diferencaDias !== 13) {
        return res.status(400).json({ 
          erro: `Escala deve ter exatamente 14 dias. Escala com ${diferencaDias + 1} dias encontrada.` 
        });
      }
    }
  }

  const escalasAtualizadas = [];

  // Processar cada escala
  for (const escalaData of escalas) {
    if (escalaData.id) {
      // Atualizar escala existente
      const escalaExistente = escalas14x14.find(e => e.id === escalaData.id && e.funcionarioId === funcionarioId);
      if (escalaExistente) {
        if (escalaData.dataEmbarque) escalaExistente.dataEmbarque = escalaData.dataEmbarque;
        if (escalaData.dataDesembarque) escalaExistente.dataDesembarque = escalaData.dataDesembarque;
        if (typeof escalaData.ativo !== 'undefined') escalaExistente.ativo = escalaData.ativo;
        if (typeof escalaData.renovacaoAutomatica !== 'undefined') escalaExistente.renovacaoAutomatica = escalaData.renovacaoAutomatica;
        escalasAtualizadas.push(escalaExistente);
      }
    } else if (escalaData.dataEmbarque && escalaData.dataDesembarque) {
      // Criar nova escala
      const novaEscala = {
        id: proximoEscalaId++,
        funcionarioId,
        funcionarioNome: funcionario.nome,
        dataEmbarque: escalaData.dataEmbarque,
        dataDesembarque: escalaData.dataDesembarque,
        ativo: escalaData.ativo !== false,
        renovacaoAutomatica: escalaData.renovacaoAutomatica !== false,
        dataCadastro: new Date().toISOString().split('T')[0]
      };
      escalas14x14.push(novaEscala);
      escalasAtualizadas.push(novaEscala);
    }
  }

  res.json({
    message: `${escalasAtualizadas.length} escalas atualizadas para ${funcionario.nome}`,
    escalas: escalasAtualizadas
  });
});

// Rota para deletar escala específica
app.delete('/api/escalas/funcionario/:funcionarioId/escala/:escalaId', (req, res) => {
  const funcionarioId = parseInt(req.params.funcionarioId);
  const escalaId = parseInt(req.params.escalaId);

  const escalaIndex = escalas14x14.findIndex(e => e.id === escalaId && e.funcionarioId === funcionarioId);
  
  if (escalaIndex === -1) {
    return res.status(404).json({ erro: 'Escala não encontrada' });
  }

  const escalaRemovida = escalas14x14.splice(escalaIndex, 1)[0];
  
  res.json({ 
    message: 'Escala removida com sucesso',
    escalaRemovida
  });
});

// Rota de autenticação
app.post('/auth/login', (req, res) => {
  const { sapid, senha } = req.body;

  if (!sapid || !senha) {
    return res.status(400).json({ erro: 'SAP ID e senha são obrigatórios' });
  }

  // Validar se sapid é numérico
  if (isNaN(sapid)) {
    return res.status(400).json({ erro: 'SAP ID deve conter apenas números' });
  }

  // Buscar funcionário pelo SAP ID
  const funcionario = funcionarios.find(f => f.sapid === sapid.toString());

  if (!funcionario) {
    return res.status(401).json({ erro: 'SAP ID não encontrado' });
  }

  // Validar senha
  const senhaValida = funcionario.senha === senha;

  if (!senhaValida) {
    return res.status(401).json({ erro: 'Senha incorreta' });
  }

  // Gerar token simples (em produção, usar JWT)
  const token = `token_${funcionario.id}_${Date.now()}`;

  // Retornar dados do usuário autenticado
  res.json({
    token,
    usuario: {
      id: funcionario.id,
      nome: funcionario.nome,
      sapid: funcionario.sapid,
      tipo: funcionario.tipo,
      departamento: funcionario.departamento
    },
    primeiroLogin: false // Por enquanto sempre false
  });
});

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Backend rodando', 
    timestamp: new Date().toISOString(),
    totalFuncionarios: funcionarios.length,
    totalSolicitacoes: solicitacoesFerias.length,
    totalCoberturas: coberturasFerias.length,
    totalEscalas: escalas14x14.length,
    configRenovacao: configRenovacao.length,
    renovacaoAutomatica: 'Ativa'
  });
});

app.listen(PORT, () => {
  console.log('🚀 Servidor backend rodando na porta ' + PORT);
  console.log('📊 API disponível em: http://localhost:' + PORT + '/api');
});
