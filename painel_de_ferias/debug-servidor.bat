@echo off
echo.
echo ========================================
echo 🧪 DEBUG - Teste do Sistema de Escalas
echo ========================================
echo.

echo 📂 Verificando diretório do backend...
cd /d "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias\backend"
if exist "server.js" (
    echo ✅ Arquivo server.js encontrado
) else (
    echo ❌ Arquivo server.js NÃO encontrado
    pause
    exit /b 1
)

echo.
echo 📦 Verificando dependências...
if exist "node_modules" (
    echo ✅ Node modules instalados
) else (
    echo 📥 Instalando dependências...
    npm install
)

echo.
echo 🚀 Iniciando servidor backend...
echo 📍 URL: http://localhost:3001
echo 🔧 Debug: http://localhost:3001/../debug-escala.html
echo.
echo Para testar:
echo   1. Abra: http://localhost:3001/../debug-escala.html
echo   2. Clique em "Testar Conexão API"
echo   3. Selecione um funcionário e datas
echo   4. Clique em "Cadastrar Escala"
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server.js
