declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      PORT: string;
    }
  }
}

export {};
