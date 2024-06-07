import React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task } from '@routy/routy-shared';

import { Wrap } from '~/styled-system/jsx/wrap.mjs';
import { Flex } from '~/styled-system/jsx/flex.mjs';
import { css } from '~/styled-system/css/css.mjs';
import { readablePriority } from '~/services/task.js';
import { get_dashboard } from '~/queries/get-dashboard.js';
import { useNullableSession } from '~/providers/session.js';
import { RightIcon } from '~/icons/react-icons.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { TasksCard } from '~/components/tasks/TasksCard.js';
import { GridSkeleton } from '~/components/skeletons/Grid.js';
import { QueryErrorHandler } from '~/components/root/QueryErrorHandler.js';
import { Page } from '~/components/root/Page.js';
import { Header, Label, NormalText, SubHeader } from '~/components/general/Text.js';
import { Icon } from '~/components/general/Icon.js';
import { CardList, RawCardListItem } from '~/components/general/CardList.js';
import { Card } from '~/components/general/Card.js';
import { Badge } from '~/components/general/Badge.js';

export const Route = createFileRoute('/_authorized/')({ component: DashboardPage });

const TaskPriorityBadge: React.FC<{ priority: Task['priority'] }> = props => (
  <Badge
    label={readablePriority(props.priority)}
    variant={
      props.priority === 'urgent'
        ? 'error'
        : props.priority === 'high'
          ? 'warning'
          : props.priority === 'normal'
            ? 'active'
            : 'gray'
    }
  />
);

const OverdueCard: React.FC<{ tasks: Task[] }> = props => (
  <CardList minWidth="container.smaller.sm" title={<Header text="Overdue" color="error" />}>
    {props.tasks.map(task => (
      <RawCardListItem
        key={task.id}
        navigate={{ to: '/tasks', search: { taskId: task.id } }}
        label={
          <Flex gap="xs">
            <NormalText text={task.title} />
            <TaskPriorityBadge priority={task.priority} />
          </Flex>
        }
        value={<Label text={getShortDateTime(task.deadline)} color="light" />}
      />
    ))}
  </CardList>
);

const PickNextCard: React.FC<{ task: Task }> = props => (
  <CardList minWidth="container.smaller.sm" title="Pick Next">
    <RawCardListItem
      navigate={{ to: '/tasks', search: { taskId: props.task.id } }}
      label={
        <Flex gap="xs">
          <NormalText text={props.task.title} />
          <TaskPriorityBadge priority={props.task.priority} />
        </Flex>
      }
      value={<Label text={getShortDateTime(props.task.deadline)} color="light" />}
    />
  </CardList>
);

function DashboardPage(): React.JSX.Element {
  const session = useNullableSession();
  const query = useApiLoad({ apiCall: get_dashboard });

  return (
    <Page title={session ? `Greetings, ${session.name}` : 'Dashboard'} networkSafe>
      {!query.finished && <GridSkeleton rows={2} columns={2} />}
      {session && query.hasData && (
        <>
          <Wrap gap="sm">
            <TasksCard dashboard={query.data} />
            {query.data.total === 0 ? (
              <Link to="/tasks" search={{ view: 'add' }}>
                <Card
                  direction="row"
                  align="center"
                  justify="center"
                  gap="sm"
                  full
                  cardStyles={css({ height: 'full' })}
                >
                  <SubHeader text="Create your first task" />
                  <Icon icon={RightIcon} />
                </Card>
              </Link>
            ) : (
              <Wrap gap="sm">
                {query.data.mostOverdue.length > 0 && <OverdueCard tasks={query.data.mostOverdue} />}
                {query.data.next && <PickNextCard task={query.data.next} />}
              </Wrap>
            )}
          </Wrap>
        </>
      )}
      <QueryErrorHandler query={query} />
    </Page>
  );
}
