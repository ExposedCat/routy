import React from 'react';

import { EmptyView } from '../root/EmptyView.js';
import { token } from '../../styled-system/tokens/index.mjs';
import type { Token } from '../../styled-system/tokens/index.mjs';
import { Grid as _Grid } from '../../styled-system/jsx/grid.mjs';
import type { GridProps as _GridProps } from '../../styled-system/jsx/grid.mjs';
import { GridItem as _GridItem } from '../../styled-system/jsx/grid-item.mjs';
import type { GridItemProps } from '../../styled-system/jsx/grid-item.mjs';

export type GridProps = _GridProps & {
  empty?: boolean;
  emptyMessage?: string;
  entity?: string;
  itemWidth?: Token;
  fixed?: boolean;
};

export const Grid = (props: GridProps) => {
  const { empty, emptyMessage, entity, itemWidth, children, fixed = false, ...rest } = props;

  const columnsTemplate = React.useMemo(() => {
    if (!itemWidth) {
      return undefined;
    }
    const limit = fixed ? token(itemWidth) : `minmax(${token(itemWidth)}, 1fr)`;
    return `repeat(auto-fill, ${limit})`;
  }, [fixed, itemWidth]);

  if (empty && (entity || emptyMessage)) {
    return <EmptyView title={emptyMessage ? emptyMessage : `You have no ${entity} yet.`} marginY="md" />;
  }

  const onGrid = (grid: HTMLElement | null) => {
    if (grid && columnsTemplate) {
      grid.style.gridTemplateColumns = columnsTemplate;
    }
  };

  return (
    <_Grid ref={onGrid} {...rest}>
      {props.children}
    </_Grid>
  );
};

export const GridItem = (props: GridItemProps) => {
  return (
    <_GridItem cursor={props.onClick ? 'pointer' : 'auto'} {...props}>
      {props.children}
    </_GridItem>
  );
};
