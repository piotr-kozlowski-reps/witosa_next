import CloseIcon from '@/app/(site)/components/icons/CloseIcon';
import CopyIcon from '@/app/(site)/components/icons/CopyIcon';
import EditIcon from '@/app/(site)/components/icons/EditIcon';
import { TNewsletterTemporary } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

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
        >
          email (+ ikonka)
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
        >
          data utworzenia (+ ikonka)
        </button>
      );
    },
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      const creationDate = row.getValue('updatedAt');
      const formattedDate = new Date(creationDate as string).toLocaleDateString(
        'pl'
      );
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const newsletterRowData = row.original;
      const newsletterEmail = newsletterRowData.email;
      return (
        <div>
          <button
            onClick={() => navigator.clipboard.writeText(newsletterEmail)}
          >
            <CopyIcon
              actionFn={() => navigator.clipboard.writeText(newsletterEmail)}
              alt="Kopiuj adres e-mail."
            />
          </button>
          <button className="ml-4">
            <EditIcon
              actionFn={() => {
                alert('not implemented');
              }}
              alt="Edytuj email Newslettera."
            />
          </button>
          <button className="ml-4">
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
