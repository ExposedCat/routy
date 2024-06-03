import type { Express } from 'express';

import type { TypedRequest } from '../types/server.js';
import { getUserById } from '../services/user.js';
import { createTask } from '../services/task.js';

export function attachCreateTask(server: Express) {
  server.post('/user/task', async (req: TypedRequest<{ title: string; description: string }, { ok: true }>, res) => {
    const { title, description } = req.body;
    if (!title) {
      return res.status(200).json({ ok: false, message: 'Invalid input', data: null });
    }

    const user = req.userId ? await getUserById(req.userId, server.locals.database) : null;
    if (!user) {
      return res.status(200).json({ ok: false, message: 'User not found', data: null });
    }

    await createTask({
      db: server.locals.database,
      task: {
        userId: user._id.toString(),
        title,
        description,
        // TODO:
        status: 'open',
        priority: 'normal',
        deadline: new Date(),
      },
    });
    return res.status(200).json({ ok: true, message: 'Task created', data: { ok: true } });
  });
}
