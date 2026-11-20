import { API_BASE_URL } from '../utils/constants';

/**
 * @param {string} path
 * @returns {Promise<any>}
 */
export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }

  return res.json();
}

/**
 * @typedef {Object} HealthResponse
 * @property {boolean} success
 * @property {string} status
 * @property {number} uptime
 * @property {'connected' | 'unavailable'} db
 * @property {string} timestamp
 */

/** @returns {Promise<HealthResponse>} */
export async function getHealthStatus() {
  return apiGet('/health');
}
