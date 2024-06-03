import type { Express } from 'express';
import type { Task } from '@routy/routy-shared';

import type { TypedRequest } from '../types/server.js';
import { getUserTasks } from '../services/task.js';

export type GetTasksResponse = {
  tasks: Task[];
};

export function attachGetTasks(server: Express) {
  server.get('/user/tasks', async (req: TypedRequest<void, GetTasksResponse>, res) => {
    if (!req.userId) {
      return res.status(200).json({ ok: false, message: 'Unauthorized', data: null });
    }

    const tasks = await getUserTasks({ db: server.locals.database, userId: req.userId });

    return res.status(200).json({
      ok: true,
      message: 'Task list',
      data: { tasks },
    });
  });
}
