# e2e-repo-3

A small Node.js (Express) label service used as a target for end-to-end testing, next to e2e-baseline-app. Owner: agent c.

Tests push to `baseline` (the Target's baseline branch) and `side`. `main` stays as it is.

| Path | Description |
| --- | --- |
| `GET /health` | Health check |
| `GET /api/labels` | JSON list of labels (kept in memory) |
| `POST /api/labels` | Create a label. Body: `{"name": "..."}`. Returns `201`, or `400` if `name` is missing |
| `GET /api/summary` | Number of labels, and of items in e2e-baseline-app. Returns `502` if that app can't be reached |

No credential is needed. `ITEMS_URL` is e2e-baseline-app's items address (default `http://localhost:3000/api/items`; with Compose, port 3000 on the host).

## Start the app

Requires Docker with Compose v2.

```bash
docker compose up --build
```

Then open http://localhost:3100/health. To stop: `docker compose down`.
