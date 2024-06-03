import type { Session } from '../models/session.js';
import { buildProvider } from '../hooks/provider.jsx';

export const {
  Provider: ProvideSession,
  useValue: useNullableSession,
  useRequireValue: useSession,
} = buildProvider<Session>('ProvideSession', true);
