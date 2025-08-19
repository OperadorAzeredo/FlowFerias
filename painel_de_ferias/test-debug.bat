@echo off
echo.
echo =============================================
echo 🧪 DEBUG - Iniciando Servidor de Teste
echo =============================================
echo.

cd /d "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias\backend"

echo 📦 Verificando dependências...
if not exist "node_modules" (
    echo 📥 Instalando dependências...
    npm install
    echo.
)

echo 🚀 Iniciando servidor debug...
echo.
echo 📍 URLs de teste:
echo   - Status: http://localhost:3001/api/status
echo   - Debug:  http://localhost:3001/../debug-escala.html
echo.
echo 🔧 Para testar o cadastro de escala:
echo   1. Abra o navegador em: http://localhost:3001/../debug-escala.html
echo   2. Clique em "Testar Conexão API"
echo   3. Preencha os dados e teste o cadastro
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server-debug.js

pause
