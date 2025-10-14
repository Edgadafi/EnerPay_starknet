const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const BITSO_WEBHOOK_SECRET = process.env.BITSO_WEBHOOK_SECRET || '';

function verifySignature(req) {
  // Si Bitso envía una firma en headers, verifica aquí
  // const signature = req.headers['x-bitso-signature'];
  // const expected = crypto.createHmac('sha256', BITSO_WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex');
  // return signature === expected;
  return true; // Si no hay firma, omite
}

router.post('/bitso-webhook', express.json(), (req, res) => {
  if (!verifySignature(req)) return res.status(401).json({ error: 'Invalid signature' });

  // Procesa el depósito
  const { amount, payment_id, payer_name, clabe, status } = req.body.payload || {};
  // Aquí puedes acreditar MXNB al usuario correspondiente en tu sistema

  res.status(200).json({ ok: true });
});

module.exports = router; 