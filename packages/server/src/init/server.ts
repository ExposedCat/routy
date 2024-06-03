import express from 'express';

import type { Database } from '../types/database/database.js';
import { attachAuth } from '../middlewares/auth.js';
import { attachGetTasks } from '../controllers/user.tasks.js';
import { attachCreateTask, attachRemoveTask, attachUpdateTask } from '../controllers/user.task.js';
import { attachGetSession } from '../controllers/session.js';
import { attachRegister } from '../controllers/register.js';
import { attachLogin } from '../controllers/login.js';

export function createServer(port: number, database: Database) {
  const server = express();

  server.locals.database = database;

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  attachAuth(server);

  attachLogin(server);
  attachRegister(server);

  attachCreateTask(server);
  attachRemoveTask(server);
  attachUpdateTask(server);

  attachGetSession(server);
  attachGetTasks(server);

  return {
    server,
    startServer: () =>
      server.listen(port, () => {
        console.log(`Server running on http://127.0.0.1:${port}`);
      }),
  };
}
