'use strict';

const express = require('express');

function createApp({ itemsUrl }) {
  const app = express();
  const labels = [];
  let nextId = 1;

  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.get('/api/labels', (_req, res) => res.json(labels));

  app.post('/api/labels', (req, res) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    if (!name) return res.status(400).json({ error: 'name is required' });
    const label = { id: nextId++, name };
    labels.push(label);
    res.status(201).json(label);
  });

  // Reads e2e-baseline-app's items.
  app.get('/api/summary', async (_req, res) => {
    try {
      const response = await fetch(itemsUrl, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const items = await response.json();
      res.json({ labels: labels.length, items: items.length });
    } catch (err) {
      console.error('Items service failed:', err.message);
      res.status(502).json({ error: 'items service unavailable' });
    }
  });

  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

  return app;
}

module.exports = { createApp };
