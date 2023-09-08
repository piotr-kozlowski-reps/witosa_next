import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  ////tsx
  return (
    <div>
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
    </div>
  );
}
