import { Router } from 'express';
import { body } from 'express-validator';
import {
  userController,
  createUserController,
} from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';

const route = Router();

export default (app: Router) => {
  app.use(route);
  route.get('/login', userController);
  route.post(
    '/register',
    body('username')
      .exists()
      .withMessage('Please provide a username!')
      .isLength({ min: 3 })
      .bail(),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid e-mail format!')
      .bail(),
    body('password')
      .exists()
      .withMessage('Please provide a password with minimum lenght 8 character!')
      .isLength({ min: 8 })
      .withMessage('The password must have at least 8 character!')
      .bail(),
    validateRequest,
    createUserController
  );
};
