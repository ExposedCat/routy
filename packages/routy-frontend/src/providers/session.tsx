import type { GetSessionResponse } from '@routy/routy-shared';

import { buildProvider } from '../hooks/provider.js';

export const {
  Provider: ProvideSession,
  useValue: useNullableSession,
  useRequireValue: useSession,
} = buildProvider<GetSessionResponse>('ProvideSession', true);
