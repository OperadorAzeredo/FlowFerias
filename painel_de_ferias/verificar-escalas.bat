@echo off
echo 🚀 Iniciando verificacao das escalas importadas...
echo.

echo 📡 Iniciando servidor backend...
cd backend
start "Backend Server" cmd /k "node server.js"
timeout /t 3 /nobreak > nul

echo.
echo ⏳ Aguardando servidor inicializar...
timeout /t 5 /nobreak > nul

echo.
echo 🔍 Verificando escalas...
cd ..
node verificar-escalas.js

echo.
echo 💡 Para verificar novamente, execute: node verificar-escalas.js
pause
