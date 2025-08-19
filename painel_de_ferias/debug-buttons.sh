#!/bin/bash

echo "🔧 Teste de Debug - Botões de Aprovação"
echo "======================================="

API_BASE="http://localhost:3001/api"

echo ""
echo "1. 📊 Status atual das solicitações:"
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "2. 🧪 Testando aprovação manual da solicitação ID 2:"
curl -s -X PUT "$API_BASE/ferias/2/aprovar" \
  -H "Content-Type: application/json" | python3 -m json.tool

echo ""
echo "3. 📊 Status após aprovação:"
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "4. 🧪 Testando rejeição manual da solicitação ID 3:"
curl -s -X PUT "$API_BASE/ferias/3/rejeitar" \
  -H "Content-Type: application/json" | python3 -m json.tool

echo ""
echo "5. 📊 Status final:"
curl -s "$API_BASE/ferias" | python3 -m json.tool

echo ""
echo "✅ Teste concluído!"
echo ""
echo "Agora abra o navegador e pressione F12 para ver os logs do console."
echo "Em seguida, clique nos botões de aprovar/rejeitar para verificar os logs."
