import { useEffect, useState } from 'react';
import { getHealthStatus } from '../services/api';

/** @typedef {'checking' | 'online' | 'degraded' | 'offline'} HealthStatus */

/** @returns {HealthStatus} */
export function useHealthStatus() {
  const [status, setStatus] = useState(/** @type {HealthStatus} */ ('checking'));

  useEffect(() => {
    let isMounted = true;

    getHealthStatus()
      .then((data) => {
        if (!isMounted) return;
        setStatus(data?.db === 'connected' ? 'online' : 'degraded');
      })
      .catch(() => {
        if (isMounted) setStatus('offline');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
