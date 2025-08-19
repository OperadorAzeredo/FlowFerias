#!/bin/bash

echo "🧪 Testando Sistema de Gestão de Férias"
echo "======================================="

API_BASE="http://localhost:3001/api"

echo ""
echo "1. 📊 Verificando status do backend..."
curl -s "$API_BASE/status" | python3 -m json.tool

echo ""
echo "2. 👥 Listando funcionários..."
curl -s "$API_BASE/funcionarios" | python3 -m json.tool

echo ""
echo "3. 📋 Verificando solicitações atuais..."
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "4. ➕ Criando uma nova solicitação de férias..."
curl -s -X POST "$API_BASE/ferias" \
  -H "Content-Type: application/json" \
  -d '{
    "funcionarioId": 3,
    "dataInicio": "2025-11-01",
    "dataFim": "2025-11-15",
    "motivo": "Férias de fim de ano"
  }' | python3 -m json.tool

echo ""
echo "5. 📋 Verificando solicitações após criação..."
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "6. ✅ Aprovando uma solicitação (ID 2)..."
curl -s -X PUT "$API_BASE/ferias/2/aprovar" \
  -H "Content-Type: application/json" | python3 -m json.tool

echo ""
echo "7. 📋 Verificando solicitações após aprovação..."
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "8. 🔍 Verificando férias do funcionário 2..."
curl -s "$API_BASE/ferias/funcionario/2" | python3 -m json.tool

echo ""
echo "🎉 Teste concluído!"
echo ""
echo "Acesse os painéis:"
echo "- Frontend: http://localhost:3000"
echo "- Supervisor: http://localhost:3000/supervisor"
echo "- Funcionário: http://localhost:3000/funcionario"
