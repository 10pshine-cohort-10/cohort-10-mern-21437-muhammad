const { Pool } = require('pg');
const env = require('./env');
const logger = require('./logger');

// Only PostgreSQL is wired up today (see README "Requirements"). DB_CLIENT is
// validated here rather than silently ignored so a mismatched .env fails loudly
// instead of pretending to connect to a database type we don't actually support.
const SUPPORTED_CLIENTS = ['postgres'];

/** @type {import('pg').Pool | null} */
let pool = null;

/** @returns {import('pg').Pool} */
function getPool() {
  if (!SUPPORTED_CLIENTS.includes(env.db.client)) {
    throw new Error(
      `Unsupported DB_CLIENT "${env.db.client}". Only ${SUPPORTED_CLIENTS.join(', ')} ${
        SUPPORTED_CLIENTS.length > 1 ? 'are' : 'is'
      } currently supported.`
    );
  }

  if (!pool) {
    pool = new Pool({
      host: env.db.host,
      port: env.db.port,
      database: env.db.name,
      user: env.db.user,
      password: env.db.password,
      connectionTimeoutMillis: 5000,
      query_timeout: 5000,
    });

    pool.on('error', (err) => {
      logger.error({ err }, 'Unexpected database pool error');
    });
  }

  return pool;
}

/** @returns {Promise<boolean>} */
async function checkConnection() {
  try {
    await getPool().query('SELECT 1');
    return true;
  } catch (err) {
    logger.error({ err }, 'Database connection check failed');
    return false;
  }
}

module.exports = { getPool, checkConnection };
