import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/error-handler';
import routes from './routes';

export default function (database: any) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  if (database) {
    database.checkConnection();
  }
  app.use(errorHandler);
  app.use(routes());

  return app;
}
