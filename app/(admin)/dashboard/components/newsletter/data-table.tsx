import PrevIcon from '@/app/(site)/components/icons/PrevIcon';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

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

  ////tsx
  return (
    <div>
      <div>
        <table className="mr-8 table-spacing-in-y">
          <thead className="bg-skin-cta-secondary text-skin-inverted ">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="py-2 mr-8 first:rounded-s-base last:rounded-r-base last:w-full whitespace-nowrap first:px-6 "
                      >
                        <div>
                          <span className="font-base-regular text-skin-inverted">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="p-8 h-11 bg-skin-main-bg drop-shadow-big"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="first:rounded-s-base last:rounded-r-base first:px-6 last:w-full"
                      >
                        <div>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
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

      <div className="flex items-center justify-start mt-4">
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
