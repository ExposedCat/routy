import { ObjectId } from 'mongodb';
import type { UpdateFilter } from 'mongodb';
import { TaskSchema, type PrivateTask, type Task } from '@routy/routy-shared';

import type { Database } from '../types/database/database.js';

export function getUserTasks({ userId, db }: { userId: string; db: Database }) {
  return db.tasks
    .aggregate<Task>([
      { $match: { userId } },
      {
        $addFields: { id: { $toString: '$_id' } },
      },
      { $sort: { deadline: 1 } },
      {
        $addFields: {
          statusOrder: {
            $cond: [
              { $or: [{ $eq: ['$status', 'open'] }, { $eq: ['$status', 'active'] }] },
              1,
              { $cond: [{ $eq: ['$status', 'closed'] }, 3, 2] },
            ],
          },
        },
      },
      { $sort: { statusOrder: 1 } },
    ])
    .toArray();
}

export function createTask({ db, task }: { db: Database; task: PrivateTask }) {
  return db.tasks.insertOne(task);
}

export function updateTask({ taskId, db, data }: { taskId: string; db: Database; data: UpdateFilter<PrivateTask> }) {
  return db.tasks.updateOne({ _id: new ObjectId(taskId) }, { $set: TaskSchema.partial().parse(data) });
}

export function deleteTask({ taskId, db }: { taskId: string; db: Database }) {
  return db.tasks.deleteOne({ _id: new ObjectId(taskId) });
}
