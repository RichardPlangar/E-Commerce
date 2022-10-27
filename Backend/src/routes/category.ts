import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';
import { validateRequest } from '../middlewares/validateRequest';

const route = Router();

export default (app: Router) => {
  app.use(route);
  route.get('/category', validateRequest, categoryController);
};
