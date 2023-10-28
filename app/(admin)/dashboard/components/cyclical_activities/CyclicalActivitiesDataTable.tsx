import CustomButton from '@/app/(site)/components/CustomButton';
import GoToStartIcon from '@/app/(site)/components/icons/GoToStartIcon';
import PrevIcon from '@/app/(site)/components/icons/PrevIcon';
import ModalDeleteCyclicalActivitiesContent from '@/app/(site)/components/modal/ModalDeleteCyclicalActivitiesContent';
import { useModalState } from '@/context/modalState';
import { CyclicalActivity } from '@prisma/client';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function CyclicalActivitiesDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  ////vars
  const { setShowModal } = useModalState();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  });

  ////tsx
  return (
    <div>
      <div>
        <table className="mr-8 table-spacing-in-y">
          <thead className="bg-skin-cta-secondary text-skin-inverted">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
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

          <tbody>
            <AnimatePresence>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <AnimatePresence mode="wait" key={row.id}>
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-8 h-11 bg-skin-main-bg drop-shadow-big hover:drop-shadow-lg"
                        whileHover={{ scale: 1.01 }}
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <td
                            key={cell.id}
                            className=" first:rounded-s-base last:rounded-r-base first:px-6 last:w-full"
                          >
                            <div
                              className={clsx(
                                'text-skin-base font-base-regular',
                                index > 0 ? 'ml-6' : ''
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </td>
                        ))}
                      </motion.tr>
                    </AnimatePresence>
                  );
                })
              ) : (
                <tr>
                  <td>Brak rezultatów.</td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div
        className={clsx(
          'flex items-center ',
          table.getFilteredSelectedRowModel().rows.length === 0
            ? 'justify-end'
            : 'justify-between'
        )}
      >
        {/* delete selected - start */}
        {table.getFilteredSelectedRowModel().rows.length !== 0 ? (
          <div
            className={clsx(
              ' ml-6 font-base-regular',
              table.getPageCount() < 2 ? 'mt-[7px]' : '-mt-[4px]'
            )}
          >
            wybrano{' '}
            <strong>{table.getFilteredSelectedRowModel().rows.length}</strong> z{' '}
            <strong>{table.getFilteredRowModel().rows.length}</strong>
            <div className="inline-block ml-2">
              <CustomButton
                actionFn={() => {
                  const filteredUsersIds = table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => {
                      return row.original;
                    })
                    .map((originalObject) => {
                      const originalCyclicalActivityObject: CyclicalActivity =
                        originalObject as CyclicalActivity;
                      return {
                        id: originalCyclicalActivityObject.id,
                        name: originalCyclicalActivityObject.name,
                      };
                    });
                  setShowModal(
                    true,
                    <ModalDeleteCyclicalActivitiesContent
                      cyclicalActivities={filteredUsersIds}
                    />
                  );
                }}
                text="skasuj elementy"
                descriptionText="Skasuj wszytskie wybrane elementy."
                disabled={false}
              />
            </div>
          </div>
        ) : null}
        {/* delete selected - end */}

        {/* pagination start */}
        {table.getPageCount() >= 2 ? (
          <div className="flex items-center justify-end mr-8 mt-[2px]">
            <div>
              <GoToStartIcon
                actionFn={() => table.setPageIndex(0)}
                alt="Pierwsza strona."
                disabled={!table.getCanPreviousPage()}
              />
            </div>
            <div>
              <PrevIcon
                actionFn={() => table.previousPage()}
                alt="Poprzednia strona."
                disabled={!table.getCanPreviousPage()}
              />
            </div>
            <div>
              <span className="flex items-center gap-1 mx-6 font-base-regular -mt-[6px]">
                <div>Strona</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1}
                </strong> z <strong>{table.getPageCount()}</strong>
              </span>
            </div>
            <div>
              <PrevIcon
                actionFn={() => table.nextPage()}
                alt="Następna strona."
                disabled={!table.getCanNextPage()}
                isToBeFlippedToBeNextButton={true}
              />
            </div>

            <div>
              <GoToStartIcon
                actionFn={() => table.setPageIndex(table.getPageCount() - 1)}
                alt="Ostatnia strona."
                disabled={!table.getCanNextPage()}
                isToBeFlippedToBeNextButton={true}
              />
            </div>
          </div>
        ) : null}
        {/* pagination end */}
      </div>
    </div>
  );
}
