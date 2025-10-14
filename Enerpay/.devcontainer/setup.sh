#!/bin/bash

echo "🚀 Setting up EnerPay Starknet Development Environment..."

# Update system packages
sudo apt-get update && sudo apt-get upgrade -y

# Install additional dependencies
sudo apt-get install -y \
    build-essential \
    curl \
    git \
    pkg-config \
    libssl-dev \
    cmake \
    libclang-dev \
    libpq-dev

# Install Starknet tools
echo "📦 Installing Starknet tools..."

# Install Scarb (Starknet package manager)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
echo 'source ~/.bashrc' >> ~/.bashrc

# Install Starknet CLI
curl -L https://github.com/starknet-io/starknet-cli/releases/download/v0.11.1/starknet-cli-v0.11.1-x86_64-unknown-linux-gnu.tar.gz | tar -xz
sudo mv starknet-cli /usr/local/bin/

# Install Starknet Devnet (local testnet)
pip3 install starknet-devnet

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd /workspaces/EnerPay_starknet/Enerpay
npm install

# Install Rust dependencies for contracts
echo "📦 Installing Rust dependencies..."
cd /workspaces/EnerPay_starknet/Enerpay/contracts
cargo install --locked scarb

# Create workspace structure
echo "📁 Setting up workspace..."
mkdir -p /workspaces/EnerPay_starknet/scripts
mkdir -p /workspaces/EnerPay_starknet/docs

# Set up environment variables
echo "🔧 Setting up environment..."
cat >> ~/.bashrc << 'EOF'

# Starknet Environment
export STARKNET_RPC_URL="https://starknet-sepolia.infura.io/v3/YOUR_INFURA_KEY"
export STARKNET_CHAIN_ID="0x534e5f5345504f4c4941" # Sepolia
export STARKNET_ACCOUNT_DIR="/workspaces/EnerPay_starknet/accounts"

# EnerPay Development
export ENERPAY_ENV="development"
export ENERPAY_LOG_LEVEL="debug"

EOF

# Create helpful aliases
echo "🔧 Setting up aliases..."
cat >> ~/.bashrc << 'EOF'

# EnerPay Development Aliases
alias enerpay-dev="cd /workspaces/EnerPay_starknet/Enerpay && npm run dev"
alias enerpay-build="cd /workspaces/EnerPay_starknet/Enerpay && npm run build"
alias enerpay-test="cd /workspaces/EnerPay_starknet/Enerpay && npm test"
alias scarb-build="cd /workspaces/EnerPay_starknet/Enerpay/contracts && scarb build"
alias scarb-test="cd /workspaces/EnerPay_starknet/Enerpay/contracts && scarb test"
alias devnet-start="starknet-devnet --host 0.0.0.0 --port 5050"
alias starknet-declare="starknet-cli --rpc-url http://localhost:5050"

EOF

# Create a welcome script
cat > /workspaces/EnerPay_starknet/welcome.sh << 'EOF'
#!/bin/bash

echo "🎉 Welcome to EnerPay Starknet Development Environment!"
echo ""
echo "📋 Available commands:"
echo "  enerpay-dev      - Start frontend development server"
echo "  enerpay-build    - Build frontend for production"
echo "  scarb-build      - Build Cairo contracts"
echo "  scarb-test       - Run contract tests"
echo "  devnet-start     - Start local Starknet devnet"
echo "  starknet-declare - Declare contracts to devnet"
echo ""
echo "🚀 Quick start:"
echo "  1. Run 'enerpay-dev' to start the frontend"
echo "  2. Run 'devnet-start' in another terminal for local testnet"
echo "  3. Open http://localhost:5173 to see your app"
echo ""
echo "📚 Documentation:"
echo "  - Cairo: https://book.cairo-lang.org/"
echo "  - Starknet: https://docs.starknet.io/"
echo "  - Scarb: https://docs.swmansion.com/scarb/"
echo ""

EOF

chmod +x /workspaces/EnerPay_starknet/welcome.sh

echo "✅ Setup complete! Run './welcome.sh' for quick start guide."
echo ""
echo "🎯 Next steps:"
echo "  1. Push this to GitHub"
echo "  2. Create a Codespace from the repository"
echo "  3. Run './welcome.sh' in the Codespace"
