import type { TaskPriority, TaskStatus } from '@routy/routy-shared';

import { CloseIcon, DoneIcon, InProgressIcon, WaitingIcon } from '~/icons/react-icons.js';

export function readablePriority(priority: TaskPriority) {
  return {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: 'Urgent',
  }[priority];
}

export function readableStatus(status: TaskStatus) {
  return {
    open: 'Open',
    active: 'In Progress',
    done: 'Done',
    closed: 'Closed',
  }[status];
}

export function statusIcon(status: TaskStatus) {
  return {
    open: WaitingIcon,
    active: InProgressIcon,
    done: DoneIcon,
    closed: CloseIcon,
  }[status];
}
