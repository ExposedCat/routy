import type { Database } from './types/database/database.js';

declare module 'express-serve-static-core' {
  export interface Locals {
    database: Database;
  }

  export interface Request {
    userId: string | null;
  }
}

export {};
