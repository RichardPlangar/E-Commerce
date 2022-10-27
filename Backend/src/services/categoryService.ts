import { categoryRepository } from '../repositories/categoryRepository';
import { CategoryDomainModel } from '../models/domain/CategoryDomainModel';

const categoryService = {
  async getCategory(): Promise<CategoryDomainModel[]> {
    const allCategory = await categoryRepository.getCategory();
    return allCategory;
  },
};

export { categoryService };
