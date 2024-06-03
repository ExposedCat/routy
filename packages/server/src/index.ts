import dotenv from 'dotenv';

import { createServer } from './init/server.js';
import { createDatabase } from './init/database.js';

async function main() {
  dotenv.config();

  const { connectToDb } = createDatabase();
  const database = await connectToDb();

  const { startServer } = createServer(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, database);
  startServer();
}

void main();
