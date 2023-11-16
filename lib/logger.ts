import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';
import { createLogger, format, transports } from 'winston';
// import 'winston-daily-rotate-file';

const getLogger = (_fileName = 'witosa') => {
  // const fileLogTransport = new transports.DailyRotateFile({
  //   filename: `logs/${fileName}-%DATE%.log`,
  //   datePattern: 'YYYY-MM-DD',
  //   zippedArchive: true,
  //   maxSize: '20m',
  //   maxFiles: '30d',
  // });

  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    format: format.printf((i) => `${i.message}`),
  });

  const axiomTransport = createLogger({
    level: 'info',
    format: format.combine(format.errors({ stack: true }), format.json()),
    defaultMeta: { service: 'witosa' },
    transports: [
      new AxiomTransport({
        token: process.env.AXIOM_TOKEN || '',
        dataset: process.env.AXIOM_DATASET,
      }),
    ],
  });

  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    defaultMeta: { service: 'my-app' },
    transports: [consoleTransport, axiomTransport],
    exceptionHandlers: [axiomTransport],
    rejectionHandlers: [axiomTransport],
  });

  // if (process.env.NODE_ENV === 'development') {
  //   logger.add(fileLogTransport);
  // }

  // logger.add(fileLogTransport);
  logger.add(consoleTransport);

  return logger;
};

export default getLogger();
