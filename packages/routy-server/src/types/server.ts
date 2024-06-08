import type { Request } from 'express';

export type TypedRequest<T, R> = Request<
  Record<string, never>,
  { message: string } & ({ ok: false; data: null } | { ok: true; data: R }),
  T
>;
