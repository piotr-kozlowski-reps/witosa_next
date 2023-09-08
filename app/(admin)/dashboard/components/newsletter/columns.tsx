import { TNewsletterTemporary } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TNewsletterTemporary>[] = [
  { header: 'email', accessorKey: 'email' },
  {
    header: 'data utworzenia',
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
            copy email
          </button>
          <button className="ml-4">edit</button>
          <button className="ml-4">delete</button>
        </div>
      );
    },
  },
];
