import mongoose from 'mongoose';
import winstonLogger from '../../../config/winston-logger';
import path from 'path';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? path.resolve('.env.tests')
    : path.resolve('.env')
});

class Database {
  constructor () {
    this.connect();
  }

  connect () {
    const dbConnectionPath:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.w1es0.mongodb.net/${process.env.DB_NAME}`;
    mongoose.connect(dbConnectionPath);
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
