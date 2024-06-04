import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task } from '@routy/routy-shared';

import { Wrap } from '~/styled-system/jsx/wrap.mjs';
import { Flex } from '~/styled-system/jsx/flex.mjs';
import { readablePriority } from '~/services/task.js';
import { get_dashboard } from '~/queries/get-dashboard.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { TasksCard } from '~/components/tasks/TasksCard.js';
import { GridSkeleton } from '~/components/skeletons/Grid.js';
import { QueryErrorHandler } from '~/components/root/QueryErrorHandler.js';
import { Page } from '~/components/root/Page.js';
import { Header, Label, NormalText } from '~/components/general/Text.js';
import { CardList, RawCardListItem } from '~/components/general/CardList.js';
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

function DashboardPage(): React.JSX.Element {
  const query = useApiLoad({ apiCall: get_dashboard });

  return (
    <Page title="Dashboard">
      {!query.finished && <GridSkeleton rows={2} columns={2} />}
      {query.hasData && (
        <>
          <TasksCard dashboard={query.data} />
          <Wrap gap="sm">
            {query.data.mostOverdue.length > 0 && (
              <CardList minWidth="container.smaller.sm" title={<Header text="Overdue" color="error" />}>
                {query.data.mostOverdue.map(task => (
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
            )}
            {query.data.next && (
              <CardList minWidth="container.smaller.sm" title="Pick Next">
                <RawCardListItem
                  navigate={{ to: '/tasks', search: { taskId: query.data.next.id } }}
                  label={
                    <Flex gap="xs">
                      <NormalText text={query.data.next.title} />
                      <TaskPriorityBadge priority={query.data.next.priority} />
                    </Flex>
                  }
                  value={<Label text={getShortDateTime(query.data.next.deadline)} color="light" />}
                />
              </CardList>
            )}
          </Wrap>
        </>
      )}
      <QueryErrorHandler query={query} />
    </Page>
  );
}
