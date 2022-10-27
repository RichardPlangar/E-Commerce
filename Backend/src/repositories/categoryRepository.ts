import { database } from '../data/connection';
import { CategoryDomainModel } from '../models/domain/CategoryDomainModel';

const categoryRepository = {
  async getCategory(): Promise<CategoryDomainModel[]> {
    const sqlQuery = 'SELECT * FROM category';
    const getCategory = await database.query<CategoryDomainModel[]>(sqlQuery);
    return getCategory;
  },
};

export { categoryRepository };
