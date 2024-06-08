import type { Express } from 'express';

import { decodeToken, verifyToken } from '../services/jwt.js';

export function attachAuth(server: Express) {
  server.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      req.userId = null;
    } else {
      const rawToken = token.replace('Bearer ', '');
      const isValid = verifyToken(rawToken);
      if (!isValid) {
        req.userId = null;
      } else {
        const data = decodeToken(rawToken);
        req.userId = data?.userId ?? null;
      }
    }
    return next();
  });
}
