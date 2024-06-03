import type { Collection } from 'mongodb';
import type { PrivateTask, PrivateUser } from '@routy/routy-shared';

export type Database = {
  users: Collection<PrivateUser>;
  tasks: Collection<PrivateTask>;
};
