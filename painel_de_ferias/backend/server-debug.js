const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

console.log('🚀 Iniciando servidor backend...');

const app = express();
const PORT = 3001;

// Middleware com logs detalhados
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Log de requisições
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Base de dados simplificada para teste
let funcionarios = [
  { id: 1, nome: 'João Silva', sapid: '12345', email: 'joao@empresa.com', cargo: 'Desenvolvedor', equipe: 'regular' },
  { id: 2, nome: 'Maria Santos', sapid: '98765', email: 'maria@empresa.com', cargo: 'Analista', equipe: 'regular' },
  { id: 3, nome: 'Pedro Costa', sapid: '11122', email: 'pedro@empresa.com', cargo: 'Designer', equipe: 'regular' },
  { id: 4, nome: 'Ana Lima', sapid: '55566', email: 'ana@empresa.com', cargo: 'Gerente', equipe: 'regular' }
];

let escalas14x14 = [];
let proximoEscalaId = 1;

// Rota de status
app.get('/api/status', (req, res) => {
  console.log('✅ Rota /api/status acessada');
  res.json({ 
    status: 'Backend rodando', 
    timestamp: new Date().toISOString(),
    totalFuncionarios: funcionarios.length,
    totalEscalas: escalas14x14.length,
    port: PORT
  });
});

// Rota para listar funcionários
app.get('/api/funcionarios', (req, res) => {
  console.log('✅ Rota /api/funcionarios acessada');
  res.json(funcionarios);
});

// Rota para cadastrar escala (versão simplificada para debug)
app.post('/api/escalas', (req, res) => {
  try {
    console.log('📝 Rota POST /api/escalas acessada');
    console.log('📦 Dados recebidos:', req.body);
    
    const { funcionarioId, dataEmbarque, dataDesembarque } = req.body;

    // Validações básicas
    if (!funcionarioId || !dataEmbarque || !dataDesembarque) {
      console.log('❌ Campos obrigatórios faltando');
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Converter funcionarioId para número
    const funcionarioIdNum = parseInt(funcionarioId);
    if (isNaN(funcionarioIdNum)) {
      console.log('❌ ID do funcionário inválido:', funcionarioId);
      return res.status(400).json({ erro: 'ID do funcionário deve ser um número válido' });
    }

    // Verificar se funcionário existe
    const funcionario = funcionarios.find(f => f.id === funcionarioIdNum);
    if (!funcionario) {
      console.log('❌ Funcionário não encontrado com ID:', funcionarioIdNum);
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    // Validar datas
    const embarque = new Date(dataEmbarque);
    const desembarque = new Date(dataDesembarque);

    if (isNaN(embarque.getTime()) || isNaN(desembarque.getTime())) {
      console.log('❌ Datas inválidas:', { dataEmbarque, dataDesembarque });
      return res.status(400).json({ erro: 'Datas de embarque e desembarque devem ser válidas' });
    }

    if (embarque >= desembarque) {
      console.log('❌ Data de embarque deve ser anterior à data de desembarque');
      return res.status(400).json({ erro: 'Data de embarque deve ser anterior à data de desembarque' });
    }

    // Validar período de 14 dias
    const diferencaDias = Math.ceil((desembarque - embarque) / (1000 * 60 * 60 * 24));
    console.log('📊 Validação de período:', { diferencaDias, esperado: 13 });
    
    if (diferencaDias !== 13) {
      console.log('❌ Período inválido:', diferencaDias + 1, 'dias');
      return res.status(400).json({ 
        erro: `A escala deve ter exatamente 14 dias. Período informado: ${diferencaDias + 1} dias` 
      });
    }

    // Criar nova escala
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
    
    console.log('✅ Escala criada com sucesso:', novaEscala);
    res.status(201).json(novaEscala);
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar escala:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor ao cadastrar escala',
      detalhes: error.message,
      stack: error.stack
    });
  }
});

// Rota para listar escalas
app.get('/api/escalas', (req, res) => {
  console.log('✅ Rota /api/escalas acessada');
  const escalasComNomes = escalas14x14.map(escala => {
    const funcionario = funcionarios.find(f => f.id === escala.funcionarioId);
    return {
      ...escala,
      funcionarioNome: funcionario ? funcionario.nome : 'Funcionário não encontrado'
    };
  });
  res.json(escalasComNomes);
});

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro global capturado:', err);
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    detalhes: err.message,
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log('🎉 Servidor backend iniciado com sucesso!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🧪 Debug: http://localhost:${PORT}/../debug-escala.html`);
  console.log(`📊 Status: http://localhost:${PORT}/api/status`);
  console.log('🔍 Para debugar, acesse o arquivo debug-escala.html');
});

server.on('error', (error) => {
  console.error('❌ Erro ao iniciar servidor:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já está em uso. Tente encerrar outros processos ou usar outra porta.`);
  }
});

// Tratamento de encerramento
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});
