const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para supervisores
app.get('/supervisor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'supervisor.html'));
});

// Rota para funcionários
app.get('/funcionario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'funcionario.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 Frontend rodando na porta ${PORT}`);
  console.log(`🏠 Acesse: http://localhost:${PORT}`);
});
