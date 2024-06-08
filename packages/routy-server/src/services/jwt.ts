import jwt from 'async-jsonwebtoken';

interface TokenPayload {
  userId: string;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  const [data, error] = await jwt.sign(payload, process.env.JWT_SECRET as string);
  if (!data) {
    throw new Error('Cannot sign token', error);
  }
  return data;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const [data] = await jwt.verify(token, process.env.JWT_SECRET as string);
    return data as TokenPayload;
  } catch {
    return null;
  }
}

export function decodeToken(token: string): TokenPayload | null {
  const decoded = jwt.decode(token);
  return decoded ? (decoded as TokenPayload) : null;
}
