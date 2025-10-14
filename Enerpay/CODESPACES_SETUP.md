# 🚀 EnerPay Starknet Development en GitHub Codespaces

## 📋 Prerequisites

1. **GitHub Account** con acceso a Codespaces
2. **Fork del repositorio** EnerPay
3. **2 horas de Codespaces** (gratis al mes)

## 🔧 Setup en 5 minutos

### 1. Crear Codespace

```bash
# Desde GitHub.com
1. Ve a tu fork del repositorio
2. Click en "Code" → "Codespaces" → "Create codespace"
3. Selecciona "EnerPay Starknet Development"
4. Espera 2-3 minutos para el setup automático
```

### 2. Verificar instalación

```bash
# En el terminal del Codespace
./welcome.sh

# Verificar herramientas instaladas
scarb --version
starknet-cli --version
node --version
npm --version
```

### 3. Desarrollo rápido

```bash
# Frontend
enerpay-dev          # Inicia servidor de desarrollo
enerpay-build        # Build para producción

# Contratos
scarb-build          # Compila contratos Cairo
scarb-test           # Ejecuta tests

# Red local
devnet-start         # Inicia Starknet devnet local
```

## 🌐 Networks disponibles

### Sepolia Testnet
```bash
./scripts/deploy.sh sepolia
```

### Mainnet (cuando esté listo)
```bash
./scripts/deploy.sh mainnet
```

### Devnet local
```bash
devnet-start
./scripts/deploy.sh devnet
```

## 📱 Desarrollo Full-Stack

### Frontend (React + TypeScript)
- **Puerto**: 5173 (Vite)
- **Hot reload**: Automático
- **Wallet integration**: Starknet React

### Backend (Node.js)
- **Puerto**: 4000
- **API**: REST endpoints
- **Database**: SQLite para desarrollo

### Contratos (Cairo)
- **Compilación**: Scarb
- **Testing**: Scarb test framework
- **Deploy**: Starknet CLI

## 🔗 URLs importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Starknet Devnet**: http://localhost:5050
- **StarkScan**: https://sepolia.starkscan.co/

## 🎯 Workflow típico

1. **Desarrollo de contratos**:
   ```bash
   cd contracts
   scarb build
   scarb test
   ```

2. **Deploy a testnet**:
   ```bash
   ./scripts/deploy.sh sepolia
   ```

3. **Desarrollo frontend**:
   ```bash
   enerpay-dev
   # Abre http://localhost:5173
   ```

4. **Testing completo**:
   ```bash
   # Conecta wallet
   # Aproba tokens MXNB
   # Realiza pago de prueba
   ```

## 🔧 Troubleshooting

### Error: "Command not found"
```bash
source ~/.bashrc
```

### Error: "Port already in use"
```bash
# Cambiar puertos en devcontainer.json
```

### Error: "RPC connection failed"
```bash
# Verificar INFURA_KEY en .env
```

## 📚 Recursos útiles

- [Cairo Book](https://book.cairo-lang.org/)
- [Starknet Docs](https://docs.starknet.io/)
- [Scarb Documentation](https://docs.swmansion.com/scarb/)
- [Starknet React](https://github.com/apibara/starknet-react)

## 🎉 ¡Listo para desarrollar!

Tu ambiente de desarrollo está completamente configurado con:
- ✅ Rust + Cairo
- ✅ Node.js + React
- ✅ Starknet tools
- ✅ Hot reload
- ✅ Port forwarding
- ✅ Git integration

**¡Empieza a codear tu MVP de EnerPay!** 🚀
