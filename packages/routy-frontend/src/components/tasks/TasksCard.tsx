import { Link } from '@tanstack/react-router';
import type { DashboardData } from '@routy/routy-shared';

import { useOnMobile } from '~/hooks/mobile.js';
import { Header, Label } from '../general/Text.js';
import { Flex } from '../general/Flex.js';
import type { FlexProps } from '../general/Flex.js';
import { Card } from '../general/Card.js';
import type { CardProps } from '../general/Card.js';

type TaskCardEntryProps = FlexProps & {
  title: React.ReactNode;
  value: React.ReactNode;
};

const TaskCardEntry: React.FC<TaskCardEntryProps> = props => {
  const { title, value, ...rest } = props;
  return (
    <Flex direction="column" {...rest}>
      <Label color="unset" weight="medium" text={title} />
      <Header color="unset" text={value} />
    </Flex>
  );
};

export const TasksCard: React.FC<CardProps & { dashboard: DashboardData }> = props => {
  const onMobile = useOnMobile();

  console.log(onMobile);

  return (
    <Link to="/tasks">
      <Card
        gap="md"
        variant="filled"
        colorVariant="active"
        direction="row"
        justify="space-between"
        withHoverEffect
        {...props}
      >
        <Flex direction="column">
          <TaskCardEntry title="Tasks" value={props.dashboard.total} />
        </Flex>
        <Flex gap="sm">
          <TaskCardEntry title="For Today" value={props.dashboard.today} />
          <TaskCardEntry title="Open" value={props.dashboard.open} />
          <TaskCardEntry title="Overdue" value={props.dashboard.overdue} />
        </Flex>
      </Card>
    </Link>
  );
};
