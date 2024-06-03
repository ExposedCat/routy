import { ObjectId } from 'mongodb';
import type { UpdateFilter } from 'mongodb';
import type { PrivateTask, Task } from '@routy/routy-shared';

import type { Database } from '../types/database/database.js';

export function getUserTasks({ userId, db }: { userId: string; db: Database }) {
  return db.tasks
    .aggregate<Task>([
      { $match: { userId } },
      {
        $addFields: {
          id: { $toString: '$_id' },
        },
      },
    ])
    .toArray();
}

export function createTask({ db, task }: { db: Database; task: PrivateTask }) {
  return db.tasks.insertOne(task);
}

export function updateTask({ taskId, db, data }: { taskId: string; db: Database; data: UpdateFilter<PrivateTask> }) {
  return db.tasks.updateOne({ _id: new ObjectId(taskId) }, { $set: data });
}

export function deleteTask({ taskId, db }: { taskId: string; db: Database }) {
  return db.tasks.deleteOne({ _id: new ObjectId(taskId) });
}
