@echo off
echo ========================================
echo   Iniciando Sistema de Gestao de Ferias
echo ========================================
echo.

echo [1/2] Iniciando Backend (porta 3001)...
cd "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias\backend"
start "Backend Server" cmd /k "node server.js"

timeout /t 3 /nobreak >nul

echo [2/2] Iniciando Frontend (porta 3000)...
cd "c:\Users\Lázaro Azeredo\Documents\painel_de_ferias\painel_de_ferias\frontend"
start "Frontend Server" cmd /k "node server.js"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Servidores iniciados com sucesso!
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Login:    http://localhost:3000/login.html
echo Debug:    http://localhost:3000/debug-test.html
echo.
echo Pressione qualquer tecla para abrir o sistema...
pause >nul

start "Sistema de Ferias" "http://localhost:3000/login.html"
