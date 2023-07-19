import { LogFile } from '@/types';
import { responseMessages } from '../errors/messagesUtils';

export default async function getLogFilesList(): Promise<LogFile[]> {
  const res = await fetch(`${process.env.BASE_URL}/api/logs`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(responseMessages.cannotAccessLogFiles);
  }

  const logFiles: LogFile[] = await res.json();

  return logFiles;
}
