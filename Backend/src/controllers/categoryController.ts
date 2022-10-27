import { NextFunction, Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

const categoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategory();
    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

export { categoryController };
