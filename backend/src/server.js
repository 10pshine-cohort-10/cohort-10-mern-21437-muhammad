const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');

const server = app.listen(env.port, () => {
  logger.info(`Server listening on port ${env.port} (${env.nodeEnv})`);
});

// server.close() won't invoke its callback while connections stay open,
// so force the exit after a bounded wait rather than hanging forever.
function shutdown(err, origin) {
  logger.error({ err }, `${origin}, shutting down`);

  const forceExit = setTimeout(() => process.exit(1), 10000);
  server.close(() => {
    clearTimeout(forceExit);
    process.exit(1);
  });
}

process.on('unhandledRejection', (err) => shutdown(err, 'Unhandled promise rejection'));
process.on('uncaughtException', (err) => shutdown(err, 'Uncaught exception'));
