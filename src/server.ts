import app from './app';
import 'dotenv/config';
import winstonLogger from './config/winston-logger';

app.listen(process.env.API_PORT, () => {
  winstonLogger.info(`Server running in port '${process.env.API_PORT}'`);
});
