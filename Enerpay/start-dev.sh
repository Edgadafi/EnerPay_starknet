#!/bin/bash

# EnerPay Quick Start Script
# Usage: ./start-dev.sh

echo "🚀 Starting EnerPay Development Environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the Enerpay directory."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build contracts if needed
if [ ! -f "contracts/target/release/EnerPay.json" ]; then
    echo "📦 Building contracts..."
    cd contracts
    scarb build
    cd ..
fi

# Start development servers
echo "🎯 Starting development servers..."

# Start backend in background
echo "🔧 Starting backend API..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Start frontend
echo "🎨 Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:4000"
echo ""
echo "📋 Available commands:"
echo "  Ctrl+C to stop all servers"
echo "  ./scripts/deploy.sh sepolia - Deploy to testnet"
echo "  scarb build - Build contracts"
echo ""
echo "🎉 Happy coding!"

# Wait for user to stop
wait $FRONTEND_PID
kill $BACKEND_PID 2>/dev/null
