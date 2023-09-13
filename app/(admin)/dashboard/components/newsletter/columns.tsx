import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import CopyIcon from '@/app/(site)/components/icons/CopyIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import { TNewsletterTemporary } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

export const columns: ColumnDef<TNewsletterTemporary>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(event) => {
            table.toggleAllPageRowsSelected(event.target.checked);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(event) => {
            row.toggleSelected(event.target.checked);
          }}
        />
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
      return (
        <div className="float-right mr-8 h-[42px]">
          <button
            onClick={() => navigator.clipboard.writeText(newsletterEmail)}
          >
            <CopyIcon
              actionFn={() => navigator.clipboard.writeText(newsletterEmail)}
              alt="Kopiuj adres e-mail."
            />
          </button>
          <button>
            <EditIcon
              actionFn={() => {
                alert('not implemented');
              }}
              alt="Edytuj email Newslettera."
            />
          </button>
          <button>
            <CloseIcon
              actionFn={() => {
                alert('not implemented');
              }}
              alt="Wykasuj email z Newslettera."
            />
          </button>
        </div>
      );
    },
  },
];