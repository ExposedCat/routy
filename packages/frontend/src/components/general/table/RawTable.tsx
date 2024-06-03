import { Card } from '../Card.js';
import { _Table, _TableRow, _TableHeader, _TableHead, _TableCell, TableBody } from '../../shadow-panda/Table.js';
import { EmptyView } from '../../root/EmptyView.js';

export type TableProps = React.ComponentProps<typeof _Table> & {
  empty?: boolean;
  entity?: string;
  withBorder?: boolean;
};

export const Table = (props: TableProps) => {
  const { empty, entity, children, withBorder = true, ...rest } = props;

  const table = (
    <_Table {...rest}>
      {empty
        ? entity && (
            <TableBody>
              <RawTableRow>
                <_TableCell>
                  <EmptyView marginY="md" title={`You have no ${entity} yet.`} />
                </_TableCell>
              </RawTableRow>
            </TableBody>
          )
        : props.children}
    </_Table>
  );

  return !withBorder ? (
    table
  ) : (
    <Card padding={0} fullWidth>
      {table}
    </Card>
  );
};

export type TableRowProps = React.ComponentProps<typeof _TableRow>;

export const RawTableRow = (props: TableRowProps) => {
  return (
    <_TableRow cursor={props.onClick ? 'pointer' : 'auto'} {...props}>
      {props.children}
    </_TableRow>
  );
};

export type TableHeaderProps = React.ComponentProps<typeof _TableHeader>;

export const TableHeader = (props: TableHeaderProps) => {
  return (
    <_TableHeader {...props}>
      <RawTableRow _hover={{ bgColor: 'transparent' }}>{props.children}</RawTableRow>
    </_TableHeader>
  );
};

export type TableHeadProps = React.ComponentProps<typeof _TableHead>;

export const TableHead = (props: TableHeadProps) => {
  return (
    <_TableHead fontWeight="medium" color="black" {...props}>
      {props.children}
    </_TableHead>
  );
};
