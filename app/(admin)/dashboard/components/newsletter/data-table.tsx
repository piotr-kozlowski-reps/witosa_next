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
import PrevIcon from '@/app/(site)/components/icons/PrevIcon';

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
        <table className="rounded-base">
          <thead className="bg-skin-cta-secondary text-skin-inverted rounded-md">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} style={{ borderRadius: '20px' }}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <td key={header.id} className="px-4 py-2">
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
                      <td key={cell.id} className="px-4 py-2">
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

      <div className="mt-4 flex justify-start items-center">
        {/* TODO: dodać schowanie obu buttonów jeżeli nie ma sensu paginacja */}
        <div>
          <PrevIcon
            actionFn={() => table.previousPage()}
            alt="Poprzednia strona."
            disabled={!table.getCanPreviousPage()}
          />
        </div>
        <div>
          <PrevIcon
            actionFn={() => table.nextPage()}
            alt="Następna strona."
            disabled={!table.getCanNextPage()}
            isToBeFlippedToBeNextButton={true}
          />
        </div>
      </div>

      <div className="bg-red-400">
        {table.getFilteredSelectedRowModel().rows.length} z{' '}
        {table.getFilteredRowModel().rows.length} wybrane
      </div>
    </div>
  );
}
