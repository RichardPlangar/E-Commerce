import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/error-handler';
//import routes from './routes';

export default function (databaseConnection: any) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(errorHandler);

  return app;
}
