import { RoleDomainModel } from '../models/domain/RoleDomainModel';

export const roleRepository = {
  findRoleById(id: number): RoleDomainModel {
    return {
      id,
      name: 'customer',
    };
  },
};
