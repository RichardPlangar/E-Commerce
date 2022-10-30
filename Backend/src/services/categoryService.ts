import { categoryRepository } from '../repositories/categoryRepository';
import { CategoryDomainModel } from '../models/domain/CategoryDomainModel';

const categoryService = {
  async getCategory(): Promise<string[]> {
    const allCategoryFromDatabase: CategoryDomainModel[] =
      await categoryRepository.getCategory();

    if (allCategoryFromDatabase.length) {
      const allCategory = allCategoryFromDatabase.map((x) => x.category);
      return allCategory;
    }
    throw new Error('There are no categories available!');
  },
};

export { categoryService };
