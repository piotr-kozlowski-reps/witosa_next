import { FileList } from '@/types';
import { responseMessages } from '../errors/responseMessages';

export default async function getLogFilesList(): Promise<FileList> {
  const res = await fetch(`${process.env.BASE_URL}/logs`);

  if (!res.ok) {
    throw new Error(responseMessages.cannotAccessLogFiles);
  }
  const logFiles: FileList = await res.json();
  return logFiles;
}
