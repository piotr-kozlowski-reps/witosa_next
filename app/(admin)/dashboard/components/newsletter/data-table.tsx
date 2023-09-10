import React, { useState } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function NewsletterDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  ////vars
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  console.log({ rowSelection });

  ////tsx
  return (
    <div>
      <div>
        <input
          placeholder="filter by emails"
          value={(table.getColumn('email')?.getFilterValue() as string) || ''}
          onChange={(e) => {
            table.getColumn('email')?.setFilterValue(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <td key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Brak rezultatów.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        {/* TODO: dodać schowanie obu buttonów jeżeli nie ma sensu paginacja */}
        <button
          className="disabled:text-skin-gray"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          prev
        </button>
        <button
          className="disabled:text-skin-gray ml-4"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
      </div>

      <div className="bg-red-400">
        {table.getFilteredSelectedRowModel().rows.length} z{' '}
        {table.getFilteredRowModel().rows.length} wybrane
      </div>
    </div>
  );
}
