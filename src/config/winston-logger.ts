import { createLogger, transports, format } from 'winston';

const winstonLogger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()),
  transports: [
    new transports.File({
      filename: 'log/info.log',
      level: 'info'
    }),
    new transports.File({
      filename: 'log/error.log',
      level: 'error'
    })
  ]
});

export default winstonLogger;
