import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/error-handler';
//import routes from './routes';

export default function (database: any) {
  const app = express();

  if (database) {
    database.checkConnection();
  }
  app.use(cors());
  app.use(express.json());
  app.use(errorHandler);

  return app;
}
