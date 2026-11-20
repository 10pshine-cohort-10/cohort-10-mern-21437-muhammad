const pino = require('pino');
const env = require('./env');

const logger = pino({
  level: env.logLevel,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      'token',
      'req.body.password',
      'req.body.token',
      '*.password',
      '*.token',
    ],
    censor: '[REDACTED]',
  },
});

module.exports = logger;
