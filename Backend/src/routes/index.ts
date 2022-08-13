import { Router } from 'express';
import user from './user';

export default () => {
  const appRouter = Router();
  user(appRouter);
  return appRouter;
};
