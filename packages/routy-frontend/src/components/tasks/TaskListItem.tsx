import { getShortDateTime, type Task } from '@routy/routy-shared';

import { readablePriority } from '~/services/task.js';
import { Label, NormalText } from '../general/Text.js';
import { Flex } from '../general/Flex.js';
import { RawCardListItem, type RawCardListItemProps } from '../general/CardList.js';
import { Badge } from '../general/Badge.js';

export type TaskListItemProps = RawCardListItemProps & {
  task: Task;
};

export const TaskListItem: React.FC<TaskListItemProps> = props => {
  const { task } = props;
  return (
    <RawCardListItem
      label={
        <Flex gap="xs">
          <NormalText text={task.title} />
          <Badge label={readablePriority(task.priority)} />
        </Flex>
      }
      value={<Label text={getShortDateTime(task.deadline)} color="light" />}
    />
  );
};
