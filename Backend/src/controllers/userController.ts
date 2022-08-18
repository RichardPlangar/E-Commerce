import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';

const userController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = userService.getUserByEmail(req.body.email);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usernameAndEmailCheck = await userService.usernameAndEmailCheck(
      req.body.username,
      req.body.email
    );
    if (usernameAndEmailCheck) {
      const newRegisteredUser = await userService.createUserService(req.body);
      return res.status(200).json(newRegisteredUser);
    }
  } catch (error) {
    return next(error);
  }
};

export { userController, createUserController };
