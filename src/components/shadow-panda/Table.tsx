import * as React from 'react';
import { table } from '@styled-system/recipes/table.mjs';
import { tableRow } from '@styled-system/recipes/table-row.mjs';
import { tableHeader } from '@styled-system/recipes/table-header.mjs';
import { tableHead } from '@styled-system/recipes/table-head.mjs';
import { tableFooter } from '@styled-system/recipes/table-footer.mjs';
import { tableContainer } from '@styled-system/recipes/table-container.mjs';
import { tableCell } from '@styled-system/recipes/table-cell.mjs';
import { tableCaption } from '@styled-system/recipes/table-caption.mjs';
import { tableBody } from '@styled-system/recipes/table-body.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';

const TableContainer = styled('div', tableContainer);

const BaseTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>((props, ref) => (
  <TableContainer>
    <table ref={ref} {...props} />
  </TableContainer>
));
BaseTable.displayName = 'Table';

export const _Table = styled(BaseTable, table);
export const _TableHeader = styled('thead', tableHeader);
export const TableBody = styled('tbody', tableBody);
export const TableFooter = styled('tfoot', tableFooter);
export const _TableHead = styled('th', tableHead);
export const _TableRow = styled('tr', tableRow);
export const TableCell = styled('td', tableCell);
export const TableCaption = styled('caption', tableCaption);

export type TableCellProps = React.ComponentProps<typeof TableCell>;
