import jwt from 'async-jsonwebtoken';

const secretKey = process.env.SECRET_KEY as string;

interface TokenPayload {
  userId: string;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  const [data, error] = await jwt.sign(payload, secretKey);
  if (!data) {
    throw new Error('Cannot sign token', error);
  }
  return data;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const [data] = await jwt.verify(token, secretKey);
    return data as TokenPayload;
  } catch {
    return null;
  }
}

export function decodeToken(token: string): TokenPayload | null {
  const decoded = jwt.decode(token);
  return decoded ? (decoded as TokenPayload) : null;
}
