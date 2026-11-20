const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('returns a 200 with an ok status', async () => {
    try {
      const res = await request(app).get('/api/health');

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.status).to.equal('ok');
    } catch (err) {
      throw new Error(`GET /api/health request failed: ${err.message}`);
    }
  });
});

describe('GET /api/unknown-route', () => {
  it('returns a 404 for unknown routes', async () => {
    try {
      const res = await request(app).get('/api/unknown-route');

      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
    } catch (err) {
      throw new Error(`GET /api/unknown-route request failed: ${err.message}`);
    }
  });
});
