import type { Collection } from 'mongodb';

import type { User } from './user.js';

export type Database = {
  users: Collection<User>;
};
