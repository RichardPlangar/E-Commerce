import { userService } from '../../src/services/userService';
import { userRepository } from '../../src/repositories/userRepository';
import { UserDomainModel } from '../../src/models/domain/UserDomainModel';
import exp from 'constants';

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

describe('userService - createUserService', () => {
  it('Should return the new username and e-mail address', async () => {
    const newUser: UserDomainModel = {
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    };

    const expectedResult = {
      username: 'test',
      email: 'test@test.com',
    };

    userRepository.createUser = jest.fn().mockResolvedValue('5');
    userRepository.getUserById = jest.fn().mockResolvedValue(newUser);

    const result = await userService.createUserService(newUser);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResult);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserById).toBeCalledTimes(1);
    expect(userRepository.createUser).toBeCalledWith(newUser);
    expect(userRepository.getUserById).toHaveBeenCalledWith('5');
  });
  it('Should throw database error if the database is not available', async () => {
    const newUser: UserDomainModel = {
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    };

    userRepository.createUser = jest
      .fn()
      .mockRejectedValue(new Error('Database Error!'));

    try {
      await userService.createUserService(newUser);
    } catch (error) {
      expect(error).toEqual(new Error('Database Error!'));
      expect(userRepository.createUser).toBeCalledTimes(1);
    }
  });
});

describe('userService - userLogin', () => {
  it('Should return the username and e-mail address if the user passes the validation', async () => {
    const loginUser = {
      username: 'test',
      password: 'password',
    };

    const mockedRepositoryResponse: UserDomainModel = {
      id: 2,
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      role: 1,
    };

    userRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValue(mockedRepositoryResponse);

    const result = await userService.userLogin(
      loginUser.username,
      loginUser.password
    );

    expect(result).toBeDefined();
    expect(result).toEqual({ username: 'test', email: 'test@test.com' });
    expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByUsername).toHaveBeenCalledWith(
      loginUser.username
    );
  });
  it('Should throw error if the user does not exist', async () => {
    userRepository.getUserByUsername = jest.fn().mockResolvedValue(undefined);
    try {
      await userService.userLogin('testUser', 'password');
    } catch (error) {
      expect(error).toEqual(new Error('The username does not exist'));
      expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
    }
  });
  it('Should throw error if the password is incorrect', async () => {
    const mockedRepositoryResponse = {
      id: 2,
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      role: 1,
    };
    userRepository.getUserByUsername = jest
      .fn()
      .mockResolvedValue(mockedRepositoryResponse);
    try {
      await userService.userLogin('test', 'test');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid password'));
      expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
    }
  });
});
