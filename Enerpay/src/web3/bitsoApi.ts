// Este archivo ya no debe contener lógica de peticiones firmadas a la API de Bitso.
// Usa fetch a los endpoints del backend para interactuar con Bitso.

// Ejemplo de helper para obtener balance desde el backend:
export async function getBackendBitsoBalance(currency: string = 'mxn') {
  const res = await fetch(`/api/bitso/balance?currency=${currency}`);
  const data = await res.json();
  return data.balance;
}

// Ejemplo de helper para crear una CLABE desde el backend:
export async function createBackendClabe(label: string) {
  const res = await fetch('/api/bitso/create-clabe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label })
  });
  return await res.json();
}

// Ejemplo de helper para hacer una orden desde el backend:
export async function placeBackendOrder(book: string, side: 'buy' | 'sell', amount: string, price: string) {
  const res = await fetch('/api/bitso/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book, side, amount, price })
  });
  return await res.json();
} 