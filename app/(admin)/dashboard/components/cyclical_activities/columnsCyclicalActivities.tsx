import { CyclicalActivity } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import CyclicalActivityColumnWithActions from './CyclicalActivityColumnWithActions';

export const columnsCyclicalActivities: ColumnDef<CyclicalActivity>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <div className="checkbox-rect -mt-[9px]">
          <input
            type="checkbox"
            id="checkbox-rect1"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(event) => {
              table.toggleAllPageRowsSelected(event.target.checked);
            }}
          />
          <label htmlFor="checkbox-rect1"></label>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="checkbox-rect -mt-[9px]">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            id={row.id}
            onChange={(event) => {
              row.toggleSelected(event.target.checked);
            }}
          />
          <label htmlFor={row.id}></label>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="float-left w-56 ml-6"
        >
          <span
            className={clsx(
              'text-white float-left',
              column.getIsSorted() ? 'font-base-bold' : 'font-base-regular'
            )}
          >
            nazwa zajęć
          </span>

          <Image
            alt="ikonka sortowania."
            src={`${process.env.NEXT_PUBLIC_BASE_URL}sort-icon.svg`}
            width={14}
            height={14}
            className="inline-block ml-[7px] mb-[2px] float-left"
          />
        </button>
      );
    },
    accessorKey: 'name',
    id: 'name',
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="float-left ml-6"
        >
          <Fragment>
            <span
              className={clsx(
                'text-white',
                column.getIsSorted() ? 'font-base-bold' : 'font-base-regular'
              )}
            >
              data utworzenia
            </span>
            <Image
              alt="ikonka sortowania."
              src={`${process.env.NEXT_PUBLIC_BASE_URL}sort-icon.svg`}
              width={14}
              height={14}
              className="inline-block ml-[7px] mb-[2px]"
            />
          </Fragment>
        </button>
      );
    },
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const creationDate = row.getValue('createdAt');
      const formattedDate = new Date(creationDate as string).toLocaleDateString(
        'pl'
      );
      return <div>{formattedDate}</div>;
    },
  },
  {
    header: () => {
      return (
        <div className="float-left ml-6">
          <span className="text-white font-base-regular">publikowany?</span>
        </div>
      );
    },
    accessorKey: 'isToBePublished',
    cell: ({ row }) => {
      const isToBePublished = row.getValue('isToBePublished') as boolean;
      const formattedText = isToBePublished ? 'TAK' : 'NIE';

      return (
        <div
          className={clsx(
            formattedText === 'TAK' ? 'text-cta-secondary' : '',
            formattedText === 'NIE' ? 'text-skin-error' : ''
          )}
        >
          {formattedText}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: ({ table }) => {
      return (
        <div className="float-right mr-8">
          <input
            placeholder="wyszukaj zajęcia"
            value={(table.getColumn('name')?.getFilterValue() as string) || ''}
            onChange={(e) => {
              table.getColumn('name')?.setFilterValue(e.target.value);
            }}
            className="mt-0 form-input"
          ></input>
        </div>
      );
    },
    cell: ({ row }) => {
      const cyclicalActivity = row.original;
      return (
        <CyclicalActivityColumnWithActions
          cyclicalActivity={cyclicalActivity}
        />
      );
    },
  },
];
