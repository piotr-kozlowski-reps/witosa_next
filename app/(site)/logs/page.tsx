import { checkIfUserIsAnAdminAndIfNot_RedirectToPath } from '@/lib/sessionHelpers';
import Link from 'next/link';

const temporaryApiResponse = [
  { fileName: 'file1name' },
  { fileName: 'file2name' },
  { fileName: 'file3name' },
];

export default async function Logs() {
  await checkIfUserIsAnAdminAndIfNot_RedirectToPath('/login');
  //show error page when not an admin - not redirect

  // const session = useSession();

  // useEffect(() => {
  //   console.log({ session });
  //   if (session.status !== 'loading' && session.data?.user?.role !== 'ADMIN') {
  //     throw new Error('Ta strona przeznaczona jest tylko dla Administratora.');
  //   }
  // }, [session]);

  // const logFilesList = await getLogFilesList();

  return (
    <div>
      <div>Lista plików z logami:</div>
      {temporaryApiResponse.map((file) => {
        return (
          <p key={file.fileName} className="p-4">
            <Link href={`/logs/${file.fileName}`}>{file.fileName}</Link>
          </p>
        );
      })}
    </div>
  );
}
