import type { Express } from 'express';
import type { GetSessionResponse } from '@routy/routy-shared';

import type { TypedRequest } from '../types/server.js';
import { getUserById } from '../services/user.js';

export function attachGetSession(server: Express) {
  server.get('/session', async (req: TypedRequest<void, GetSessionResponse>, res) => {
    if (!req.userId) {
      return res.status(200).json({ ok: false, message: 'Unauthorized', data: null });
    }

    const user = await getUserById(req.userId, server.locals.database);
    if (!user) {
      return res.status(200).json({ ok: false, message: 'User does not exist', data: null });
    }

    const { password: _, ...data } = user;

    return res.status(200).json({ ok: true, message: 'User found', data });
  });
}
