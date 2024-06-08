import type { Express } from 'express';

import type { TypedRequest } from '../types/server.js';
import { getUserByEmail } from '../services/user.js';
import { generateToken } from '../services/jwt.js';

export function attachLogin(server: Express) {
  server.post('/login', async (req: TypedRequest<{ email: string; password: string }, { token: string }>, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({ ok: false, message: 'Invalid input', data: null });
    }

    const user = await getUserByEmail({
      email: req.body.email.toLowerCase(),
      db: server.locals.database,
    });
    if (!user) {
      return res.status(200).json({ ok: false, message: 'User not found', data: null });
    }

    if (password !== user.password) {
      return res.status(200).json({ ok: false, message: 'Incorrect password', data: null });
    }

    const token = await generateToken({ userId: user._id.toString() });
    return res.status(200).json({ ok: true, message: 'User logged in', data: { token } });
  });
}
