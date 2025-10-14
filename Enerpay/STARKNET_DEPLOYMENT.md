# 🚀 EnerPay Starknet Deployment Guide

## 📋 Prerequisites

1. **Wallet con fondos de testnet**
   - Argent X, Braavos, o cualquier wallet compatible con Starknet
   - Fondos ETH en Sepolia testnet para gas fees

2. **Contratos compilados**
   - `EnerPay.cairo` - Contrato principal
   - `MXNB.cairo` - Token ERC20

## 🔧 Deployment Steps

### 1. Compilar Contratos en Remix IDE

1. Ve a [Remix IDE](https://remix.ethereum.org/)
2. Selecciona "Starknet" en el workspace
3. Crea nuevos archivos:
   - `EnerPay.cairo`
   - `MXNB.cairo`
   - `IERC20.cairo`

4. Copia el contenido de los archivos desde este proyecto
5. Compila cada contrato

### 2. Deploy MXNB Token

```cairo
// Constructor parameters:
// initial_supply: 1000000000000000000000000 (1M tokens con 18 decimals)
// recipient: [TU_ADDRESS]
```

### 3. Deploy EnerPay Contract

```cairo
// Constructor parameters:
// mxnb_token: [MXNB_CONTRACT_ADDRESS]
// treasury: [TREASURY_ADDRESS]
```

### 4. Actualizar Direcciones en el Frontend

Actualiza estas constantes en `src/hooks/useEnerPay.ts`:

```typescript
const ENERPAY_CONTRACT_ADDRESS = '0x[ACTUAL_ADDRESS]';
const MXNB_CONTRACT_ADDRESS = '0x[ACTUAL_ADDRESS]';
```

### 5. Testing

1. Conecta tu wallet
2. Aproba tokens MXNB al contrato EnerPay
3. Realiza un pago de prueba

## 📱 Frontend Setup

El frontend ya está configurado con:
- ✅ Starknet React hooks
- ✅ Wallet connection
- ✅ Contract interaction
- ✅ Balance display
- ✅ Approval flow

## 🔗 Testnet URLs

- **Starknet Sepolia**: https://sepolia.starkscan.co/
- **Explorer**: https://testnet.starkscan.co/

## 📞 Support

Si tienes problemas:
1. Verifica que tienes ETH para gas
2. Confirma que las direcciones están correctas
3. Revisa los logs de la consola del navegador

## 🎯 Next Steps

1. Deploy a mainnet cuando esté listo
2. Integrar oracle de precios para MXN/MXNB
3. Implementar pagos múltiples en el contrato
4. Agregar más validaciones de seguridad

