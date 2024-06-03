import { MongoClient } from 'mongodb';

import type { Database } from '../types/database/database.js';

export function createDatabase() {
  const client = new MongoClient(process.env.DB_CONNECTION_STRING);

  const dbName = 'fitty';

  return {
    client,
    connectToDb: async (): Promise<Database> => {
      console.log('Connecting to the database...');
      await client.connect();
      console.log('Done');
      const db = client.db(dbName);
      return {
        users: db.collection('users'),
      };
    },
  };
}
