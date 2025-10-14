import React from 'react';
import { StarknetConfig, publicProvider } from '@starknet-react/core';
import { sepolia } from '@starknet-react/chains';

interface StarknetProviderProps {
  children: React.ReactNode;
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}

