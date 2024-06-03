import type { Express } from 'express';

import type { TypedRequest } from '../types/server.js';
import { getUserById } from '../services/user.js';

export type GetSessionResponse = {
  userId: string;
  userName: string;
};

export function attachGetSession(server: Express) {
  server.get('/session', async (req: TypedRequest<void, GetSessionResponse>, res) => {
    if (!req.userId) {
      return res.status(200).json({ ok: false, message: 'Unauthorized', data: null });
    }

    const user = await getUserById(req.userId, server.locals.database);
    if (!user) {
      return res.status(200).json({ ok: false, message: 'User does not exist', data: null });
    }

    return res.status(200).json({
      ok: true,
      message: 'User found',
      data: {
        userId: user._id.toString(),
        userName: user.name,
      },
    });
  });
}
