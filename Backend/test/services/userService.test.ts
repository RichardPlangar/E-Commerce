import { userService } from '../../src/services/userService';
import { userRepository } from '../../src/repositories/userRepository';
import { UserDomainModel } from '../../src/models/domain/UserDomainModel';

describe('userService - usernameAndEmailCheck', () => {
  it('Should return true if the username and e-mail validation passes', async () => {
    const mockedUserObject: UserDomainModel = {
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    };

    userRepository.getUserByUsername = jest.fn().mockResolvedValue(undefined);
    userRepository.getUserByEmail = jest.fn().mockResolvedValue(undefined);

    const result = await userService.usernameAndEmailCheck(
      mockedUserObject.username,
      mockedUserObject.email
    );

    expect(result).toBeDefined();
    expect(result).toBe(true);
    expect(userRepository.getUserByUsername).toBeCalledTimes(1);
    expect(userRepository.getUserByEmail).toBeCalledTimes(1);
    expect(userRepository.getUserByUsername).toHaveBeenCalledWith(
      mockedUserObject.username
    );
    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
      mockedUserObject.email
    );
  });
  it('Should throw error if the username or the e-mail is already exist', async () => {
    const mockedUserObject: UserDomainModel = {
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    };

    const mockedRepositoryResponseObject: UserDomainModel = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      role: 1,
    };
    userRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValue(mockedRepositoryResponseObject);

    try {
      const result = await userService.usernameAndEmailCheck(
        mockedUserObject.username,
        mockedUserObject.email
      );
    } catch (error) {
      expect(error).toEqual(
        new Error('The username or the email already exist!')
      );
    }
  });
});
