// Configuración de API URLs para diferentes entornos
const API_BASE_URL = import.meta.env.PROD 
  ? '' // En producción, usar mismo dominio (Vercel serverless functions)
  : 'http://localhost:4000'; // En desarrollo, usar backend local

export const API_ENDPOINTS = {
  redeem: `${API_BASE_URL}/api/redeem`,
  bankAccounts: `${API_BASE_URL}/api/bank-accounts`,
  registerBank: `${API_BASE_URL}/api/register-bank`,
  mockDeposit: `${API_BASE_URL}/api/mock-deposit`,
} as const;

// Función helper para hacer requests con manejo de errores
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || `HTTP ${response.status}: Error en la API`);
  }
  
  return data;
} 