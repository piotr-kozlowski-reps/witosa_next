import { TNewsletterTemporary } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import NewsletterColumnWithActions from './NewsletterColumnWithActions';

export const columns: ColumnDef<TNewsletterTemporary>[] = [
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
          className="float-left"
        >
          <span
            className={clsx(
              'text-skin-inverted',
              column.getIsSorted() ? 'font-base-bold' : 'font-base-regular'
            )}
          >
            email
          </span>

          <Image
            alt="ikonka sortowania."
            src={`${process.env.NEXT_PUBLIC_BASE_URL}sort-icon.svg`}
            width={14}
            height={14}
            className="inline-block ml-[7px] mb-[2px]"
          />
        </button>
      );
    },
    accessorKey: 'email',
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="ml-6"
        >
          <Fragment>
            <span
              className={clsx(
                'text-skin-inverted',
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
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      const creationDate = row.getValue('updatedAt');
      const formattedDate = new Date(creationDate as string).toLocaleDateString(
        'pl'
      );
      return <div className="ml-6">{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    header: ({ table }) => {
      return (
        <div className="float-right mr-8">
          <input
            placeholder="wyszukaj e-mail"
            value={(table.getColumn('email')?.getFilterValue() as string) || ''}
            onChange={(e) => {
              table.getColumn('email')?.setFilterValue(e.target.value);
            }}
            className="mt-0 form-input"
          ></input>
        </div>
      );
    },
    cell: ({ row }) => {
      const newsletterRowData = row.original;
      const newsletterEmail = newsletterRowData.email;
      return <NewsletterColumnWithActions newsletterEmail={newsletterEmail} />;
    },
  },
];
