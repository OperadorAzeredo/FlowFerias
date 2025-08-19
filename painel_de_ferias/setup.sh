#!/bin/bash

echo "🚀 Iniciando Sistema de Gestão de Férias"
echo "========================================"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências do backend
echo ""
echo "📦 Instalando dependências do backend..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Erro ao instalar dependências do backend"
    exit 1
fi

# Instalar dependências do frontend
echo ""
echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Erro ao instalar dependências do frontend"
    exit 1
fi

cd ..

echo ""
echo "🎉 Instalação concluída com sucesso!"
echo ""
echo "Para iniciar o sistema:"
echo "1. Backend:  cd backend && npm start"
echo "2. Frontend: cd frontend && npm start"
echo ""
echo "Acesse: http://localhost:3000"
