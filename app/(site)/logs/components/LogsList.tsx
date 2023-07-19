import getLogFilesList from '@/lib/api/getLogFilesList';
import { LogFile } from '@/types';
import { Fragment } from 'react';

export default async function LogsList() {
  ////vars
  const logFilesData: Promise<LogFile[]> = getLogFilesList();
  let logFiles: LogFile[] = [];

  try {
    logFiles = await logFilesData;
  } catch (error) {
    console.error(error);
  }

  console.log('tutaj:', { logFiles });

  ////jsx
  return (
    <Fragment>
      <div>Lista plików z logami:</div>
      {/* {temporaryApiResponse.map((file) => {
        return (
          <p key={file.fileName} className="p-4">
            <Link href={`/logs/${file.fileName}`}>{file.fileName}</Link>
          </p>
        );
      })} */}
    </Fragment>
  );
}
