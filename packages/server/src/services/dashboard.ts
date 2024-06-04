import type { WithId } from 'mongodb';
import type { DashboardData, PrivateTask } from '@routy/routy-shared';

import type { Database } from '../types/database/database.js';

type DashboardQuery = {
  total: { count: number }[];
  open: { count: number }[];
  today: { count: number }[];
  overdue: { count: number }[];
  mostOverdue: WithId<PrivateTask>[];
  next: WithId<PrivateTask>[];
};

export async function getUserDashboard({ userId, db }: { userId: string; db: Database }): Promise<DashboardData> {
  const [stats] = await db.tasks
    .aggregate<DashboardQuery>([
      { $match: { userId } },
      {
        $facet: {
          total: [
            {
              $match: { status: { $ne: 'closed' } },
            },
            { $count: 'count' },
          ],
          open: [{ $match: { status: 'open' } }, { $count: 'count' }],
          today: [
            {
              $match: {
                deadline: {
                  $gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                  $lt: new Date(new Date(new Date().setUTCHours(0, 0, 0, 0)).setUTCDate(new Date().getUTCDate() + 1)),
                },
              },
            },
            { $count: 'count' },
          ],
          overdue: [
            {
              $match: {
                deadline: { $lte: new Date() },
              },
            },
            { $count: 'count' },
          ],
          mostOverdue: [
            {
              $match: {
                deadline: { $lte: new Date() },
              },
            },
            { $sort: { deadline: 1 } },
            { $limit: 3 },
          ],
          next: [
            {
              $match: {
                deadline: { $gte: new Date() },
              },
            },
            { $sort: { deadline: 1 } },
            { $limit: 1 },
          ],
        },
      },
    ])
    .toArray();

  const next = stats.next[0] ? { id: stats.next[0]._id.toString(), ...stats.next[0] } : null;
  const mostOverdue = stats.mostOverdue.map(task => ({ id: task._id.toString(), ...task }));

  return {
    total: stats.total[0]?.count ?? 0,
    open: stats.open[0]?.count ?? 0,
    today: stats.today[0]?.count ?? 0,
    overdue: stats.overdue[0]?.count ?? 0,
    mostOverdue,
    next,
  };
}
