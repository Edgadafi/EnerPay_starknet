import React from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { Connector } from 'get-starknet-core';

export function StarknetWallet() {
  const { account, address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: Connector) => {
    connect({ connector });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (status === 'connected') {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-600">Conectado:</span>
          <span className="font-mono text-blue-600 ml-2">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Conectar Wallet</h3>
      <div className="space-y-2">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Conectar {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
}

