const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const crypto = require('crypto');
const bitsoWebhook = require('./bitso-webhook');

function buildJunoAuthHeader(apiKey, apiSecret, method, path, body = '') {
  const nonce = Date.now().toString();
  const data = `${nonce}${method}${path}${body}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(data).digest('hex');
  return `Bitso ${apiKey}:${nonce}:${signature}`;
}

const app = express();

// Configurar CORS para producción
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://enerpay.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/api', bitsoWebhook);

// Endpoint para redimir MXNB
app.post('/api/redeem', async (req, res) => {
  console.log('📥 Endpoint /api/redeem llamado con:', req.body);
  const { amount, destination_bank_account_id } = req.body;
  
  // Validación mejorada de parámetros
  if (!amount || !destination_bank_account_id) {
    console.log('❌ Faltan parámetros requeridos');
    return res.status(400).json({ 
      success: false,
      error: { message: 'Faltan parámetros requeridos (amount, destination_bank_account_id).' }
    });
  }
  
  // Validar que amount sea un número válido y mayor que el mínimo
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount < 100) {
    console.log('❌ Monto inválido:', amount);
    return res.status(400).json({ 
      success: false,
      error: { message: 'El monto debe ser un número válido mayor o igual a 100 MXN.' }
    });
  }
  
  try {
    console.log('🔄 Haciendo petición a Juno para redimir...');
    console.log('💰 Monto:', numericAmount, 'MXN');
    console.log('🏦 Cuenta destino:', destination_bank_account_id);
    
    const apiKey = process.env.BITSO_APIKEY;
    const apiSecret = process.env.BITSO_SECRET_APIKEY;
    
    if (!apiKey || !apiSecret) {
      console.log('❌ Faltan credenciales de API');
      return res.status(500).json({ 
        success: false,
        error: { message: 'Credenciales de API no configuradas.' }
      });
    }
    
    const method = 'POST';
    const path = '/mint_platform/v1/redemptions';
    const requestBody = {
      amount: numericAmount,
      destination_bank_account_id,
      asset: 'mxn'
    };
    const body = JSON.stringify(requestBody);
    
    console.log('📋 Body de la petición:', requestBody);
    const authHeader = buildJunoAuthHeader(apiKey, apiSecret, method, path, body);
    console.log('🔐 Auth header generado');
    
    // Generar UUID único para idempotency (OBLIGATORIO según documentación)
    const { randomUUID } = require('crypto');
    const idempotencyKey = randomUUID();
    console.log('🔑 Idempotency key:', idempotencyKey);
    
    const response = await axios.post(
      'https://stage.buildwithjuno.com/mint_platform/v1/redemptions',
      requestBody,
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey
        },
        timeout: 30000 // 30 segundos timeout
      }
    );
    
    console.log('✅ Respuesta exitosa de Juno:', response.data);
    
    // Estructurar respuesta consistente con éxito
    res.json({
      success: true,
      payload: response.data.payload || response.data,
      metadata: {
        idempotency_key: idempotencyKey,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error en /api/redeem:', error);
    
    if (error.response) {
      console.error('📄 Error response data:', error.response.data);
      console.error('📊 Error response status:', error.response.status);
      console.error('📑 Error response headers:', error.response.headers);
      
      // Mapear errores específicos de Juno a respuestas consistentes
      const junoError = error.response.data;
      const errorResponse = {
        success: false,
        error: {
          message: junoError.message || 'Error en la redención',
          code: junoError.code || error.response.status,
          details: junoError
        }
      };
      
      res.status(error.response.status).json(errorResponse);
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Timeout en la petición');
      res.status(408).json({
        success: false,
        error: { message: 'Timeout en la petición a Juno. Intenta nuevamente.' }
      });
    } else {
      console.error('🔌 Error de conexión:', error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Error de conexión con el servicio de redención.' }
      });
    }
  }
});

// Endpoint para obtener cuentas bancarias registradas en Juno
app.get('/api/bank-accounts', async (req, res) => {
  console.log('📥 Endpoint /api/bank-accounts llamado');
  try {
    console.log('🔄 Consultando cuentas bancarias en Juno...');
    const apiKey = process.env.BITSO_APIKEY;
    const apiSecret = process.env.BITSO_SECRET_APIKEY;
    
    if (!apiKey || !apiSecret) {
      console.log('❌ Faltan credenciales de API');
      return res.status(500).json({ 
        success: false,
        error: { message: 'Credenciales de API no configuradas.' }
      });
    }
    
    const method = 'GET';
    const path = '/mint_platform/v1/accounts/banks';
    const body = '';
    const authHeader = buildJunoAuthHeader(apiKey, apiSecret, method, path, body);
    
    const response = await axios.get(
      'https://stage.buildwithjuno.com/mint_platform/v1/accounts/banks',
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 segundos timeout
      }
    );
    
    console.log('✅ Respuesta de Juno cuentas bancarias:', response.data);
    
    // Estructurar respuesta consistente
    res.json({
      success: true,
      payload: response.data.payload || response.data,
      metadata: {
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error en /api/bank-accounts:', error);
    
    if (error.response) {
      console.error('📄 Error response data:', error.response.data);
      console.error('📊 Error response status:', error.response.status);
      
      const junoError = error.response.data;
      res.status(error.response.status).json({
        success: false,
        error: {
          message: junoError.message || 'Error al obtener cuentas bancarias',
          code: junoError.code || error.response.status,
          details: junoError
        }
      });
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Timeout en la petición');
      res.status(408).json({
        success: false,
        error: { message: 'Timeout en la petición a Juno. Intenta nuevamente.' }
      });
    } else {
      console.error('🔌 Error de conexión:', error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Error de conexión con el servicio bancario.' }
      });
    }
  }
});

// Endpoint para crear un depósito mock en Juno stage
app.post('/api/mock-deposit', async (req, res) => {
  const { amount, receiver_clabe, receiver_name, sender_clabe, sender_name } = req.body;
  if (!amount || !receiver_clabe || !receiver_name || !sender_clabe || !sender_name) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
  }
  try {
    const apiKey = process.env.BITSO_APIKEY;
    const apiSecret = process.env.BITSO_SECRET_APIKEY;
    const method = 'POST';
    const path = '/spei/test/deposits';
    const body = JSON.stringify({
      amount: String(amount),
      receiver_clabe,
      receiver_name,
      sender_clabe,
      sender_name
    });
    const authHeader = buildJunoAuthHeader(apiKey, apiSecret, method, path, body);
    const response = await axios.post(
      'https://stage.buildwithjuno.com/spei/test/deposits',
      JSON.parse(body),
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error en /api/mock-deposit:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

// Endpoint para registrar una CLABE externa en Juno
app.post('/api/register-bank', async (req, res) => {
  console.log('📥 Endpoint /api/register-bank llamado con:', req.body);
  const { tag, recipient_legal_name, clabe, ownership } = req.body;
  
  // Validación mejorada de parámetros
  if (!tag || !recipient_legal_name || !clabe || !ownership) {
    console.log('❌ Faltan parámetros requeridos');
    return res.status(400).json({ 
      success: false,
      error: { message: 'Faltan parámetros requeridos (tag, recipient_legal_name, clabe, ownership).' }
    });
  }
  
  // Validar formato de CLABE (18 dígitos)
  if (!/^\d{18}$/.test(clabe)) {
    console.log('❌ CLABE inválida:', clabe);
    return res.status(400).json({ 
      success: false,
      error: { message: 'La CLABE debe tener exactamente 18 dígitos.' }
    });
  }
  
  try {
    console.log('🔄 Registrando cuenta bancaria en Juno...');
    const apiKey = process.env.BITSO_APIKEY;
    const apiSecret = process.env.BITSO_SECRET_APIKEY;
    
    if (!apiKey || !apiSecret) {
      console.log('❌ Faltan credenciales de API');
      return res.status(500).json({ 
        success: false,
        error: { message: 'Credenciales de API no configuradas.' }
      });
    }
    
    const method = 'POST';
    const path = '/mint_platform/v1/accounts/banks';
    const requestBody = {
      tag,
      recipient_legal_name,
      clabe,
      ownership
    };
    const body = JSON.stringify(requestBody);
    
    console.log('📋 Body de la petición:', requestBody);
    const authHeader = buildJunoAuthHeader(apiKey, apiSecret, method, path, body);
    
    const response = await axios.post(
      'https://stage.buildwithjuno.com/mint_platform/v1/accounts/banks',
      requestBody,
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 segundos timeout
      }
    );
    
    console.log('✅ Cuenta bancaria registrada exitosamente:', response.data);
    
    // Estructurar respuesta consistente
    res.json({
      success: true,
      payload: response.data.payload || response.data,
      metadata: {
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error en /api/register-bank:', error);
    
    if (error.response) {
      console.error('📄 Error response data:', error.response.data);
      console.error('📊 Error response status:', error.response.status);
      console.error('📑 Error response headers:', error.response.headers);
      
      const junoError = error.response.data;
      res.status(error.response.status).json({
        success: false,
        error: {
          message: junoError.message || 'Error al registrar cuenta bancaria',
          code: junoError.code || error.response.status,
          details: junoError
        }
      });
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Timeout en la petición');
      res.status(408).json({
        success: false,
        error: { message: 'Timeout en la petición a Juno. Intenta nuevamente.' }
      });
    } else {
      console.error('🔌 Error de conexión:', error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Error de conexión con el servicio bancario.' }
      });
    }
  }
});

// Los endpoints de Bitso fueron removidos ya que ahora usamos exclusivamente Juno

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
}

// Exportar para Vercel
module.exports = app; 