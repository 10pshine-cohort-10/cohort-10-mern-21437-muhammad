require('dotenv').config();

/**
 * @typedef {Object} DbConfig
 * @property {string} client
 * @property {string} host
 * @property {number} port
 * @property {string} name
 * @property {string} user
 * @property {string} password
 */

/**
 * @typedef {Object} EnvConfig
 * @property {string} nodeEnv
 * @property {number} port
 * @property {string} logLevel
 * @property {DbConfig} db
 */

/** @type {EnvConfig} */
module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  logLevel: process.env.LOG_LEVEL || 'info',
  db: {
    client: process.env.DB_CLIENT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'notes_app',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
};
