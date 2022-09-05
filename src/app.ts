import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import './infra/database/mongo/index';
import 'dotenv/config';
import morganBody from 'morgan-body';
import logMorgan from './config/morgan-logger';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/BrunoDelani-compass-mart-0.0.1-swagger.json';
class App {
  public express: express.Application;

  public constructor () {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares ():void {
    morganBody(this.express, {
      noColors: true,
      stream: logMorgan
    });
    this.express.use(express.json());
    this.express.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.express.use(cors());
  }

  private routes ():void {
    this.express.use(...routes);
  }
}

export default new App().express;
