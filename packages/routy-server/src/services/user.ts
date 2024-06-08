import { ObjectId } from 'mongodb';
import type { UpdateFilter } from 'mongodb';
import { UserSchema, type PrivateUser } from '@routy/routy-shared';

import type { Database } from '../types/database/database.js';

export function getUserByEmail({ db, email }: { email: string; db: Database }) {
  return db.users.findOne({ email });
}

export function getUserById(id: string, db: Database) {
  return db.users.findOne({ _id: new ObjectId(id) });
}

export function createUser({
  db,
  name,
  password,
  email,
}: {
  db: Database;
  name: string;
  password: string;
  email: string;
}) {
  // TODO: Encrypt password
  return db.users.insertOne({ name, password, email });
}

export function updateUser({ userId, db, data }: { userId: string; db: Database; data: UpdateFilter<PrivateUser> }) {
  return db.users.updateOne({ _id: new ObjectId(userId) }, { $set: UserSchema.partial().parse(data) });
}
