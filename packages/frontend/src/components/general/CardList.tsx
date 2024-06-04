import React from 'react';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import { css } from '~/styled-system/css/css.mjs';
import { cva } from '../../styled-system/css/cva.mjs';
import { TableRow, TableCell, Table, TableBody } from './table/Table.js';
import { NormalText, SubLabel, Label } from './Text.js';
import { Navigational, type WithNavigate } from './Navigational.js';
import { Flex } from './Flex.js';
import { Card, type CardProps } from './Card.js';

type TableRowProps = React.ComponentProps<typeof TableRow>;
type TableCellProps = React.ComponentProps<typeof TableCell>;

const CardListVariantContext = React.createContext<'table' | 'column'>('table');

const backgroundVariants = cva({
  base: {
    borderColor: 'transparent',
    borderBottomColor: 'decoration.gray',
  },
  variants: {
    variant: {
      success: {
        backgroundColor: 'light.success',
      },
      error: {
        backgroundColor: 'light.error',
      },
      transparent: {
        backgroundColor: 'transparent',
      },
    },
  },
});

const hoverVariants = cva({
  variants: {
    variant: {
      success: {
        _hover: {
          backgroundColor: 'light.success',
        },
      },
      error: {
        _hover: {
          backgroundColor: 'light.error',
        },
      },
      transparent: {
        _hover: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export type RawCardListItemProps = TableRowProps & {
  label: React.ReactNode;
  sublabel?: React.ReactNode;
  labelAction?: React.ReactNode;
  value?: React.ReactNode;
  valueAction?: React.ReactNode;
  wrapper?: (props: React.PropsWithChildren) => React.JSX.Element | null;
  raw?: boolean;
  cellProps?: TableCellProps;
} & PropsFromCVA<typeof backgroundVariants> &
  PropsFromCVA<typeof hoverVariants>;

export const RawCardListItem = (props: RawCardListItemProps): React.JSX.Element => {
  const {
    label,
    sublabel,
    labelAction,
    value,
    valueAction,
    wrapper,
    raw = false,
    cellProps,
    variant,
    className,
    ...rowProps
  } = props;

  const variantCtx = React.useContext(CardListVariantContext);

  const Wrapper = React.useMemo(() => (wrapper ? wrapper : React.Fragment), [wrapper]);

  if (variantCtx === 'column') {
    return (
      <Wrapper>
        <Flex {...rowProps} full={!!wrapper} direction="column">
          <Label text={label} weight="medium" color="normal" />
          <Label text={value} />
        </Flex>
      </Wrapper>
    );
  }

  return (
    <TableRow
      className={clsx(variant && backgroundVariants({ variant }), hoverVariants({ variant }), className)}
      {...rowProps}
    >
      <TableCell textAlign="left" colSpan={!(value || valueAction) ? 2 : 1} {...cellProps}>
        <Wrapper>
          <Flex full={!!wrapper} direction="row" align="center" gap="xs">
            <Flex gap="xs">
              <Flex direction="column" align="left" justify="center" gap="xs">
                {typeof label === 'string' ? <NormalText text={label} /> : label}
                {typeof sublabel === 'string' ? <SubLabel text={sublabel} /> : sublabel}
              </Flex>
              {labelAction}
            </Flex>
          </Flex>
        </Wrapper>
      </TableCell>
      {(value || valueAction) && (
        <TableCell {...cellProps}>
          <Wrapper>
            <Flex wrap="wrap" full={!!wrapper} gap="xs" align="center" justify="end">
              {value && (!raw ? <NormalText text={value} color="label" /> : value)}
              {valueAction}
            </Flex>
          </Wrapper>
        </TableCell>
      )}
    </TableRow>
  );
};

export type CardListItemProps<T extends string = ''> = WithNavigate<typeof RawCardListItem, T>;

export const CardListItem = <T extends string = ''>(props: CardListItemProps<T>) => {
  const { navigate, onClick, ...rest } = props;

  const wrapperStyles = css({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: 'full',
    height: 'full',
    padding: 'sm',
  });

  return (
    <RawCardListItem
      {...rest}
      cellProps={
        navigate
          ? {
              ...rest.cellProps,
              padding: 0,
              height: 'full',
            }
          : undefined
      }
      height="full"
      onClick={onClick}
      wrapper={({ children }) => (
        <Navigational className={wrapperStyles} navigate={navigate}>
          {children}
        </Navigational>
      )}
    />
  );
};

type CardListProps = CardProps & {
  entity?: string;
  empty?: boolean;
  layout?: 'table' | 'column';
};

export const CardList = (props: React.PropsWithChildren<CardListProps>): React.JSX.Element => {
  const { entity, empty, children, layout = 'table', ...cardProps } = props;

  return (
    <Card {...cardProps} padding={0}>
      <CardListVariantContext.Provider value={layout}>
        {layout === 'table' ? (
          <Table entity={entity} empty={empty} withBorder={false}>
            <TableBody>{children}</TableBody>
          </Table>
        ) : (
          children
        )}
      </CardListVariantContext.Provider>
    </Card>
  );
};
