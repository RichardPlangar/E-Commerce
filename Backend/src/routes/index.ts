import { Router } from 'express';
import user from './user';
import category from './category';

export default () => {
  const appRouter = Router();
  user(appRouter);
  category(appRouter);
  return appRouter;
};
