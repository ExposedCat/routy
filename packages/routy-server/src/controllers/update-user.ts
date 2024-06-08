import type { Express } from 'express';
import type { UpdateUserInput } from '@routy/routy-shared';

import type { TypedRequest } from '../types/server.js';
import { getUserById, updateUser } from '../services/user.js';

export function attachUpdateUser(server: Express) {
  server.post('/user/details', async (req: TypedRequest<UpdateUserInput, { ok: true }>, res) => {
    const { currentPassword, ...details } = req.body;
    if (!req.userId) {
      return res.status(200).json({ ok: false, message: 'Unauthorized', data: null });
    }

    const user = await getUserById(req.userId, server.locals.database);
    if (!user) {
      return res.status(200).json({ ok: false, message: 'User not found', data: null });
    }

    if (details.password && (!currentPassword || user.password !== currentPassword)) {
      return res.status(200).json({ ok: false, message: 'Incorrect current password', data: null });
    }

    await updateUser({
      db: server.locals.database,
      userId: req.userId,
      data: details,
    });
    return res.status(200).json({ ok: true, message: 'User updated', data: { ok: true } });
  });
}
