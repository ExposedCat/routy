import type { Express } from 'express';

import type { TypedRequest } from '../types/server.js';
import { createUser, getUserByEmail } from '../services/user.js';
import { generateToken } from '../services/jwt.js';

export function attachRegister(server: Express) {
  server.post(
    '/register',

    async (req: TypedRequest<{ email: string; password: string; name: string }, { token: string }>, res) => {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(200).json({ ok: false, message: 'Invalid input', data: null });
      }

      const user = await getUserByEmail({
        db: server.locals.database,
        email: req.body.email.toLowerCase(),
      });
      if (user) {
        return res.status(200).json({ ok: false, message: 'User already exists', data: null });
      }

      const newUser = await createUser({ db: server.locals.database, email, password, name });
      const token = await generateToken({ userId: newUser.insertedId.toString() });
      return res.status(200).json({ ok: true, message: 'User registered', data: { token } });
    },
  );
}
