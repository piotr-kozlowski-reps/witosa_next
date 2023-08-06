import { LogFile } from '@/types';
import { responseMessages } from '../errors/messagesUtils';

export default async function getLogFileContent(
  logFileName: string
): Promise<LogFile> {
  const res = await fetch(`${process.env.BASE_URL}/logs/${logFileName}`);
  if (!res.ok) {
    throw new Error(responseMessages.cannotAccessLogFile);
  }
  const logFileContent: LogFile = await res.json();
  return logFileContent;
}
