import { Router } from 'express';
import {
  userController,
  createUserController,
} from '../controllers/userController';

const route = Router();

export default (app: Router) => {
  app.use(route);
  route.get('/login', userController);
  route.post('/register', createUserController);
};
