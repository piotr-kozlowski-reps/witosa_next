type Params = {
  params: {
    logFileName: string;
  };
};
export default function LogFileContent({ params: { logFileName } }: Params) {
  //TODO: logFile type!!!
  //use getLogFileContent function to fetch data
  return <div>log file inside: {logFileName}</div>;
}
