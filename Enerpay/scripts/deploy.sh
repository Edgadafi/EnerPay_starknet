#!/bin/bash

# EnerPay Deployment Script for Codespaces
# Usage: ./scripts/deploy.sh [network] [account]

set -e

NETWORK=${1:-"sepolia"}
ACCOUNT=${2:-"default"}

echo "🚀 Deploying EnerPay to $NETWORK network..."

# Check if we're in the right directory
if [ ! -f "Scarb.toml" ]; then
    echo "❌ Error: Scarb.toml not found. Run this script from the contracts directory."
    exit 1
fi

# Build contracts
echo "📦 Building contracts..."
scarb build

# Set network configuration
case $NETWORK in
    "sepolia")
        RPC_URL="https://starknet-sepolia.infura.io/v3/YOUR_INFURA_KEY"
        CHAIN_ID="0x534e5f5345504f4c4941"
        ;;
    "mainnet")
        RPC_URL="https://starknet-mainnet.infura.io/v3/YOUR_INFURA_KEY"
        CHAIN_ID="0x534e5f4d41494e"
        ;;
    "devnet")
        RPC_URL="http://localhost:5050"
        CHAIN_ID="0x534e5f4445564e4554"
        ;;
    *)
        echo "❌ Error: Unknown network $NETWORK. Use: sepolia, mainnet, or devnet"
        exit 1
        ;;
esac

echo "🌐 Using network: $NETWORK"
echo "🔗 RPC URL: $RPC_URL"

# Deploy MXNB token first
echo "📝 Deploying MXNB token..."
MXNB_DEPLOYMENT=$(starknet-cli --rpc-url "$RPC_URL" --account "$ACCOUNT" deploy \
    --class-hash 0x[CLASS_HASH] \
    --inputs 1000000000000000000000000 0x[RECIPIENT_ADDRESS])

MXNB_ADDRESS=$(echo "$MXNB_DEPLOYMENT" | grep -o '0x[0-9a-fA-F]*' | tail -1)
echo "✅ MXNB deployed at: $MXNB_ADDRESS"

# Deploy EnerPay contract
echo "📝 Deploying EnerPay contract..."
ENERPAY_DEPLOYMENT=$(starknet-cli --rpc-url "$RPC_URL" --account "$ACCOUNT" deploy \
    --class-hash 0x[CLASS_HASH] \
    --inputs "$MXNB_ADDRESS" 0x[TREASURY_ADDRESS])

ENERPAY_ADDRESS=$(echo "$ENERPAY_DEPLOYMENT" | grep -o '0x[0-9a-fA-F]*' | tail -1)
echo "✅ EnerPay deployed at: $ENERPAY_ADDRESS"

# Update frontend configuration
echo "🔧 Updating frontend configuration..."
cat > ../src/config/contracts.ts << EOF
// Auto-generated contract addresses for $NETWORK
export const CONTRACTS = {
  ENERPAY: '$ENERPAY_ADDRESS',
  MXNB: '$MXNB_ADDRESS',
  NETWORK: '$NETWORK',
  RPC_URL: '$RPC_URL'
} as const;
EOF

echo "✅ Deployment complete!"
echo ""
echo "📋 Contract Addresses:"
echo "  MXNB Token: $MXNB_ADDRESS"
echo "  EnerPay: $ENERPAY_ADDRESS"
echo ""
echo "🔧 Next steps:"
echo "  1. Update your wallet with the new contract addresses"
echo "  2. Test the deployment with a small transaction"
echo "  3. Verify contracts on StarkScan: https://$NETWORK.starkscan.co/"
