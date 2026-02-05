/**
 * UBUYHERE API - Health Check
 * Vercel Serverless Function
 */

export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'UBUYHERE API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}
