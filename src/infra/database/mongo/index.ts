import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
  constructor () {
    this.connect();
  }

  connect () {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.w1es0.mongodb.net/${process.env.DB_NAME}`);
    mongoose.connection.on('error', console.log.bind(console, 'Could not connect to database.'));
    mongoose.connection.once('open', () => {
      console.log(`Connection established with the database ${process.env.DB_NAME}.`);
    });
    return mongoose.connection;
  }
}

export default new Database().connect;
