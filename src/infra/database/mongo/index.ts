import mongoose from 'mongoose';
import winstonLogger from '../../../config/winston-logger';
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class Database {
  constructor () {
    this.connect();
  }

  connect () {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.w1es0.mongodb.net/${process.env.DB_NAME}`);
    mongoose.connection.on('error', () => {
      winstonLogger.error('Could not connect to database.');
    });
    mongoose.connection.once('open', () => {
      winstonLogger.info(`Connection established with the database ${process.env.DB_NAME}.`);
    });
    return mongoose.connection;
  }
}

export default new Database().connect;
