import type { Task } from '@routy/routy-shared';

import { buildProvider } from '../hooks/provider.js';

export const {
  Provider: ProvideTasks,
  useValue: useNullableTasks,
  useRequireValue: useTasks,
} = buildProvider<Task[]>('ProvideTasks', true);
