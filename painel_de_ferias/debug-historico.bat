@echo off
echo.
echo ================================================
echo 🔧 DEBUG - Teste do Histórico de Escalas
echo ================================================
echo.

cd /d "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias\backend"

echo 📦 Verificando dependências...
if not exist "node_modules" (
    echo 📥 Instalando dependências...
    npm install
    echo.
)

echo 🚀 Iniciando servidor com logs detalhados...
echo.
echo 📍 URLs de teste:
echo   - API Status: http://localhost:3001/api/status
echo   - Teste Histórico: http://localhost:3001/../teste-historico-escalas.html
echo   - Interface Principal: http://localhost:3000/funcionario.html
echo.
echo 🧪 Para testar o histórico de escalas:
echo   1. Abra: http://localhost:3001/../teste-historico-escalas.html
echo   2. Clique em "Testar API" para verificar conexão
echo   3. Selecione um funcionário
echo   4. Clique em "Cadastrar Escala de Teste"
echo   5. Clique em "Carregar Histórico"
echo.
echo 🔍 Logs detalhados aparecerão aqui no terminal
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server.js

pause
