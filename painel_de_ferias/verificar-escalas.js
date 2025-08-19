// Script para verificar as escalas importadas
const http = require('http');

// Função para fazer requisição GET
function fazerRequisicao(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function verificarEscalas() {
  try {
    console.log('🔍 Verificando escalas importadas...\n');

    // 1. Verificar status do servidor
    const status = await fazerRequisicao('/api/status');
    console.log('📊 Status do Sistema:');
    console.log(`- Total de funcionários: ${status.totalFuncionarios}`);
    console.log(`- Total de escalas: ${status.totalEscalas}`);
    console.log(`- Renovação automática: ${status.renovacaoAutomatica}\n`);

    // 2. Listar todas as escalas
    const escalas = await fazerRequisicao('/api/escalas');
    console.log('📅 Escalas Cadastradas:');
    console.log('='.repeat(80));
    
    if (escalas.length === 0) {
      console.log('❌ Nenhuma escala encontrada!');
      return;
    }

    // Agrupar escalas por funcionário
    const escalasPorFuncionario = {};
    escalas.forEach(escala => {
      if (!escalasPorFuncionario[escala.funcionarioId]) {
        escalasPorFuncionario[escala.funcionarioId] = [];
      }
      escalasPorFuncionario[escala.funcionarioId].push(escala);
    });

    // Mostrar escalas organizadas
    Object.keys(escalasPorFuncionario).forEach(funcionarioId => {
      const funcionarioEscalas = escalasPorFuncionario[funcionarioId];
      const primeiraEscala = funcionarioEscalas[0];
      
      console.log(`\n👤 ${primeiraEscala.funcionarioNome} (ID: ${funcionarioId})`);
      console.log('-'.repeat(60));
      
      funcionarioEscalas
        .sort((a, b) => new Date(a.dataEmbarque) - new Date(b.dataEmbarque))
        .forEach((escala, index) => {
          const embarque = new Date(escala.dataEmbarque).toLocaleDateString('pt-BR');
          const desembarque = new Date(escala.dataDesembarque).toLocaleDateString('pt-BR');
          const status = escala.ativo ? '✅ Ativa' : '❌ Inativa';
          const renovacao = escala.renovacaoAutomatica ? '🔄 Auto' : '⏸️ Manual';
          
          console.log(`  ${index + 1}. ${embarque} → ${desembarque} | ${status} | ${renovacao}`);
        });
    });

    // 3. Listar todos os funcionários
    console.log('\n\n👥 Funcionários Cadastrados:');
    console.log('='.repeat(80));
    
    const funcionarios = await fazerRequisicao('/api/funcionarios');
    funcionarios.forEach(funcionario => {
      const equipeIcon = funcionario.equipe === 'extra' ? '⭐' : 
                        funcionario.equipe === 'supervisor' ? '👑' : '👤';
      console.log(`${equipeIcon} ${funcionario.nome} (SAP: ${funcionario.sapid}) - ${funcionario.cargo} [${funcionario.equipe}]`);
    });

    console.log('\n✅ Verificação concluída!');

  } catch (error) {
    console.error('❌ Erro ao verificar escalas:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando na porta 3001');
    console.log('   Execute: node server.js');
  }
}

// Executar verificação
verificarEscalas();
