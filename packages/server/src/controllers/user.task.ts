import type { Express } from 'express';
import type { Task } from '@routy/routy-shared';

import type { TypedRequest } from '../types/server.js';
import { getUserById } from '../services/user.js';
import { createTask, deleteTask, updateTask } from '../services/task.js';

export function attachCreateTask(server: Express) {
  server.post(
    '/user/task',
    async (req: TypedRequest<Pick<Task, 'title' | 'description' | 'deadline' | 'priority'>, { ok: true }>, res) => {
      const { title, description, deadline, priority } = req.body;
      if (!title || !deadline || !priority) {
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
          deadline: new Date(deadline),
          status: 'open',
          priority,
        },
      });
      return res.status(200).json({ ok: true, message: 'Task created', data: { ok: true } });
    },
  );
}

export function attachRemoveTask(server: Express) {
  server.post('/user/task/remove', async (req: TypedRequest<{ id: string }, { ok: true }>, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(200).json({ ok: false, message: 'Invalid input', data: null });
    }

    await deleteTask({ db: server.locals.database, taskId: id });
    return res.status(200).json({ ok: true, message: 'Task removed', data: { ok: true } });
  });
}

export function attachUpdateTask(server: Express) {
  server.post(
    '/user/task/details',
    async (
      req: TypedRequest<
        Partial<Pick<Task, 'id' | 'title' | 'description' | 'deadline' | 'priority' | 'status'>>,
        { ok: true }
      >,
      res,
    ) => {
      const { id, ...details } = req.body;
      if (!id) {
        return res.status(200).json({ ok: false, message: 'Invalid input', data: null });
      }

      await updateTask({ db: server.locals.database, taskId: id, data: details });
      return res.status(200).json({ ok: true, message: 'Task updated', data: { ok: true } });
    },
  );
}
