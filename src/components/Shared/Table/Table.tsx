import { FC, HTMLAttributes } from "react";

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement>{}
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement>{}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>{}
interface TableCellProps extends HTMLAttributes<HTMLTableCellElement>{}

const Table = (
  { children, ...props }: HTMLAttributes<HTMLTableElement>,  
) => {
  return (
    <table {...props}>
      {children}
    </table>
  ); 
}

const TableHead: FC<TableHeadProps> = ({
  children, ...props
}) => {
  return (
    <thead {...props}>
      {children}
    </thead>
  )
}

const TableBody: FC<TableBodyProps> = ({
  children, ...props
}) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}

const TableRow: FC<TableRowProps> = ({
  children, ...props
}) => {
  return (
    <tr {...props}>
      {children}
    </tr>
  )
}

const TableCell: FC<TableCellProps> = ({
  children, ...props
}) => {
  return (
    <td {...props}>
      {children}
    </td>
  )
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;