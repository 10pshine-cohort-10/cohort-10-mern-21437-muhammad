const { checkConnection } = require('../config/database');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function getHealth(req, res, next) {
  try {
    const dbConnected = await checkConnection();

    res.status(200).json({
      success: true,
      status: 'ok',
      uptime: process.uptime(),
      db: dbConnected ? 'connected' : 'unavailable',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHealth };
