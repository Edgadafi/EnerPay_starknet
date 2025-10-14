// EnerPay Contract Configuration
// Update these addresses after deployment

export const CONTRACTS = {
  // Testnet addresses (Sepolia)
  ENERPAY: '0x0', // Update after deployment
  MXNB: '0x0',    // Update after deployment
  
  // Network configuration
  NETWORK: 'sepolia' as const,
  RPC_URL: 'https://starknet-sepolia.infura.io/v3/YOUR_INFURA_KEY',
  
  // Contract ABIs (simplified for demo)
  ENERPAY_ABI: [
    {
      "type": "function",
      "name": "pay_service",
      "inputs": [
        { "name": "rpu", "type": "felt" },
        { "name": "service_type", "type": "felt" },
        { "name": "amount", "type": "u256" },
        { "name": "company", "type": "felt" }
      ],
      "outputs": [],
      "stateMutability": "external"
    },
    {
      "type": "function",
      "name": "get_payments_by_user",
      "inputs": [
        { "name": "user", "type": "felt" }
      ],
      "outputs": [
        {
          "type": "struct",
          "name": "Payment",
          "members": [
            { "name": "payer", "type": "felt" },
            { "name": "rpu", "type": "felt" },
            { "name": "service_type", "type": "felt" },
            { "name": "amount", "type": "u256" },
            { "name": "timestamp", "type": "u64" },
            { "name": "company", "type": "felt" }
          ]
        }
      ],
      "stateMutability": "view"
    }
  ],
  
  MXNB_ABI: [
    {
      "type": "function",
      "name": "balance_of",
      "inputs": [
        { "name": "account", "type": "felt" }
      ],
      "outputs": [
        { "name": "balance", "type": "u256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        { "name": "spender", "type": "felt" },
        { "name": "amount", "type": "u256" }
      ],
      "outputs": [
        { "name": "success", "type": "felt" }
      ],
      "stateMutability": "external"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        { "name": "owner", "type": "felt" },
        { "name": "spender", "type": "felt" }
      ],
      "outputs": [
        { "name": "remaining", "type": "u256" }
      ],
      "stateMutability": "view"
    }
  ]
} as const;

// Environment-specific configuration
export const getContractConfig = (network: string = 'sepolia') => {
  switch (network) {
    case 'sepolia':
      return {
        ...CONTRACTS,
        RPC_URL: 'https://starknet-sepolia.infura.io/v3/YOUR_INFURA_KEY',
        EXPLORER_URL: 'https://sepolia.starkscan.co'
      };
    case 'mainnet':
      return {
        ...CONTRACTS,
        RPC_URL: 'https://starknet-mainnet.infura.io/v3/YOUR_INFURA_KEY',
        EXPLORER_URL: 'https://starkscan.co'
      };
    case 'devnet':
      return {
        ...CONTRACTS,
        RPC_URL: 'http://localhost:5050',
        EXPLORER_URL: 'http://localhost:5050'
      };
    default:
      throw new Error(`Unknown network: ${network}`);
  }
};
