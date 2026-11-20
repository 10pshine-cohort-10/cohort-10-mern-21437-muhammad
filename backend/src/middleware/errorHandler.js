const logger = require('../config/logger');
const env = require('../config/env');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}

/**
 * Keep this last in the middleware chain so it catches errors from every route.
 * @param {Error & { statusCode?: number, isOperational?: boolean }} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  logger.error({ err, path: req.originalUrl, method: req.method }, err.message);

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== 'production' && { stack: err.stack }),
  });
}

module.exports = { notFoundHandler, errorHandler };
