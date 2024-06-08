import type { Express } from 'express';
import type { DashboardData } from '@routy/routy-shared';

import type { TypedRequest } from '../types/server.js';
import { getUserDashboard } from '../services/dashboard.js';

export function attachGetDashboard(server: Express) {
  server.get('/user/dashboard', async (req: TypedRequest<void, DashboardData>, res) => {
    if (!req.userId) {
      return res.status(200).json({ ok: false, message: 'Unauthorized', data: null });
    }

    const dashboard = await getUserDashboard({ userId: req.userId, db: server.locals.database });

    return res.status(200).json({ ok: true, message: 'User dashboard', data: dashboard });
  });
}
