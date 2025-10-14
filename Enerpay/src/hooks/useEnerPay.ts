import { useContract, useStarknetCall, useStarknetInvoke } from '@starknet-react/core';
import { Contract, uint256 } from 'starknet';

import { CONTRACTS } from '../config/contracts';

// Usar direcciones desde la configuración
const ENERPAY_CONTRACT_ADDRESS = CONTRACTS.ENERPAY;
const MXNB_CONTRACT_ADDRESS = CONTRACTS.MXNB;

// ABI simplificado (en producción usarías el ABI completo)
const ENERPAY_ABI = [
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
];

const MXNB_ABI = [
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
];

export function useEnerPay() {
  const { contract: enerpayContract } = useContract({
    abi: ENERPAY_ABI,
    address: ENERPAY_CONTRACT_ADDRESS,
  });

  const { contract: mxnbContract } = useContract({
    abi: MXNB_ABI,
    address: MXNB_CONTRACT_ADDRESS,
  });

  return {
    enerpayContract,
    mxnbContract,
  };
}

export function useMXNBBalance(account?: string) {
  const { contract } = useContract({
    abi: MXNB_ABI,
    address: MXNB_CONTRACT_ADDRESS,
  });

  const { data: balance } = useStarknetCall({
    contract,
    method: 'balance_of',
    args: account ? [account] : [],
  });

  return balance ? uint256.uint256ToBN(balance[0]).toString() : '0';
}

export function useMXNBAllowance(owner?: string, spender?: string) {
  const { contract } = useContract({
    abi: MXNB_ABI,
    address: MXNB_CONTRACT_ADDRESS,
  });

  const { data: allowance } = useStarknetCall({
    contract,
    method: 'allowance',
    args: owner && spender ? [owner, spender] : [],
  });

  return allowance ? uint256.uint256ToBN(allowance[0]).toString() : '0';
}

export function usePayService() {
  const { enerpayContract } = useEnerPay();

  const { invoke: payService } = useStarknetInvoke({
    contract: enerpayContract,
    method: 'pay_service',
  });

  return {
    payService: (rpu: string, serviceType: string, amount: string, company: string) => {
      const amountUint256 = uint256.bnToUint256(amount);
      return payService({
        args: [rpu, serviceType, amountUint256, company],
      });
    },
  };
}

export function useApproveMXNB() {
  const { mxnbContract } = useEnerPay();

  const { invoke: approve } = useStarknetInvoke({
    contract: mxnbContract,
    method: 'approve',
  });

  return {
    approve: (spender: string, amount: string) => {
      const amountUint256 = uint256.bnToUint256(amount);
      return approve({
        args: [spender, amountUint256],
      });
    },
  };
}

