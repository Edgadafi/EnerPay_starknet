# 🚀 EnerPay - Starknet Energy Payments

> **Paga tu recibo de luz con MXNB stablecoin en Starknet**

EnerPay es una plataforma que permite a los usuarios pagar sus recibos de electricidad de CFE usando MXNB (Mexican Peso Token) en la red Starknet, proporcionando pagos instantáneos, seguros y con comisiones bajas.

## ✨ Características

- 💡 **Pagos instantáneos** de recibos CFE con MXNB
- 🔒 **Seguridad blockchain** con Starknet
- 💰 **Comisiones bajas** (0.5%)
- 🌍 **Acceso global** desde cualquier parte del mundo
- 📱 **UI moderna** y responsive
- 🔄 **Pagos múltiples** para empresas

## 🏗️ Arquitectura

### Frontend (React + TypeScript)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Wallet**: Starknet React hooks
- **State**: React hooks + Context

### Backend (Node.js)
- **Runtime**: Node.js
- **API**: REST endpoints
- **Database**: SQLite (desarrollo)
- **Integration**: Bitso API

### Smart Contracts (Cairo)
- **Language**: Cairo 2.0
- **Network**: Starknet
- **Standard**: ERC-20 (MXNB) + Custom (EnerPay)

## 🚀 Desarrollo Rápido

### Opción 1: GitHub Codespaces (Recomendado)

```bash
# 1. Fork este repositorio
# 2. Crear Codespace desde GitHub
# 3. En el terminal del Codespace:
./welcome.sh          # Ver guía de inicio
./start-dev.sh        # Iniciar desarrollo
```

### Opción 2: Desarrollo Local

```bash
# Frontend
cd Enerpay
npm install
npm run dev

# Backend
cd backend
npm install
npm start

# Contratos (requiere Rust + Scarb)
cd contracts
scarb build
```

## 📁 Estructura del Proyecto

```
EnerPay_starknet/
├── Enerpay/                    # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── hooks/             # Hooks personalizados
│   │   ├── config/            # Configuración de contratos
│   │   └── providers/         # Providers de Starknet
│   ├── contracts/             # Contratos Cairo
│   │   ├── EnerPay.cairo      # Contrato principal
│   │   ├── MXNB.cairo         # Token ERC-20
│   │   └── IERC20.cairo       # Interfaz ERC-20
│   ├── .devcontainer/         # Configuración Codespaces
│   └── scripts/               # Scripts de deployment
├── backend/                   # Backend Node.js
└── docs/                      # Documentación
```

## 🔧 Configuración

### Variables de Entorno

```bash
# Frontend
VITE_STARKNET_RPC_URL=https://starknet-sepolia.infura.io/v3/YOUR_KEY
VITE_STARKNET_CHAIN_ID=0x534e5f5345504f4c4941

# Backend
BITSO_API_KEY=your_bitso_api_key
BITSO_SECRET=your_bitso_secret
```

### Redes Soportadas

- **Sepolia Testnet**: Desarrollo y testing
- **Mainnet**: Producción (cuando esté listo)
- **Devnet Local**: Desarrollo local

## 📱 Uso

1. **Conectar Wallet**: Argent X, Braavos, o compatible
2. **Aprobar MXNB**: Permitir gastos al contrato EnerPay
3. **Consultar Recibo**: Ingresar RPU de 12 dígitos
4. **Confirmar Pago**: Revisar detalles y proceder
5. **Completado**: Recibir confirmación instantánea

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar frontend
npm run build            # Build para producción
npm run test             # Ejecutar tests

# Contratos
scarb build              # Compilar contratos
scarb test               # Ejecutar tests de contratos
./scripts/deploy.sh sepolia  # Deploy a testnet

# Codespaces
./welcome.sh             # Guía de inicio
./start-dev.sh           # Inicio rápido
```

## 🔗 Enlaces Útiles

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **StarkScan**: https://sepolia.starkscan.co/
- **Documentación Cairo**: https://book.cairo-lang.org/
- **Starknet Docs**: https://docs.starknet.io/

## 🤝 Contribuir

1. Fork el repositorio
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/EnerPay_starknet/issues)
- **Discord**: [EnerPay Community](https://discord.gg/enerpay)
- **Email**: support@enerpay.com

---

**¡Hecho con ❤️ para la comunidad Starknet!** 🚀
