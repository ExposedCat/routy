import type { Session } from '@routy/routy-shared';

import { buildProvider } from '../hooks/provider.jsx';

export const {
  Provider: ProvideSession,
  useValue: useNullableSession,
  useRequireValue: useSession,
} = buildProvider<Session>('ProvideSession', true);
