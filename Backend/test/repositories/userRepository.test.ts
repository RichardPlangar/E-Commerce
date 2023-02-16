import database from '../../src/data/connection';
import { OkPacket } from 'mysql';
import { UserDomainModel } from '../../src/models/domain/UserDomainModel';
import { userRepository } from '../../src/repositories/userRepository';

describe('userRepositry - getUserByUsername', () => {
  it('should return the requested username object', async () => {
    const mockedDatabase: UserDomainModel[] = [
      {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: 'test123',
        role: 0,
      },
      {
        id: 2,
        username: 'John Doe',
        email: 'john@doe.com',
        password: 'password123',
        role: 0,
      },
    ];

    database.query = jest.fn().mockResolvedValue(mockedDatabase);

    const result = await userRepository.getUserByUsername('test');
    const repositoryResponse: UserDomainModel = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: 'test123',
      role: 0,
    };

    expect(result).toBeDefined();
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT * FROM user WHERE username = ?',
      ['test']
    );
    expect(result).toEqual(repositoryResponse);
  });
  it('it should throw error if the repository throws error', async () => {
    database.query = jest.fn().mockRejectedValue(new Error('Database error!'));

    try {
      const result = await userRepository.getUserByUsername('test');
    } catch (error) {
      expect(error).toEqual(new Error('Database error!'));
      expect(database.query).toHaveBeenCalledTimes(1);
      expect(database.query).toHaveBeenCalledWith(
        'SELECT * FROM user WHERE username = ?',
        ['test']
      );
    }
  });
});

describe('userRepositry - getUserByEmail', () => {
  it('should return the requested user object by e-mail', async () => {
    const mockedDatabase: UserDomainModel[] = [
      {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: 'test123',
        role: 0,
      },
      {
        id: 2,
        username: 'John Doe',
        email: 'john@doe.com',
        password: 'password123',
        role: 0,
      },
    ];

    database.query = jest.fn().mockResolvedValue(mockedDatabase);
    const result = await userRepository.getUserByEmail('test@test.com');

    const expectedResult: UserDomainModel = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: 'test123',
      role: 0,
    };

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResult);
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT * FROM user WHERE email = ?',
      ['test@test.com']
    );
  });
  it('it should throw error if the repository throws error', async () => {
    database.query = jest.fn().mockRejectedValue(new Error('Database error!'));

    try {
      const result = await userRepository.getUserByEmail('john.doe@test.com');
    } catch (error) {
      expect(error).toEqual(new Error('Database error!'));
      expect(database.query).toHaveBeenCalledTimes(1);
      expect(database.query).toHaveBeenCalledWith(
        'SELECT * FROM user WHERE email = ?',
        ['john.doe@test.com']
      );
    }
  });
});

describe('userRepositry - getUserById', () => {
  it('should return the user object based on the id', async () => {
    const mockedDatabase = [
      {
        id: 1,
        username: 'test',
        email: 'test@test.com',
      },
      {
        id: 2,
        username: 'John Doe',
        email: 'john@doe.com',
      },
    ];

    database.query = jest.fn().mockResolvedValue(mockedDatabase);
    const expectedResult = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
    };

    const result = await userRepository.getUserById('1');

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResult);
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT username, email FROM user WHERE id = ?',
      ['1']
    );
  });
  it('should return the user object based on the id', async () => {
    const mockedDatabaseResponse = [
      {
        id: 2,
        username: 'John Doe',
        email: 'john@doe.com',
      },
      {
        id: 3,
        username: 'test',
        email: 'test@test.com',
      },
    ];

    database.query = jest.fn().mockResolvedValue(mockedDatabaseResponse);

    const result = await userRepository.getUserById('2');
    const expectedResult = {
      id: 2,
      username: 'John Doe',
      email: 'john@doe.com',
    };

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResult);
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith(
      'SELECT username, email FROM user WHERE id = ?',
      ['2']
    );
  });
  it('it should throw error if the repository throws error', async () => {
    database.query = jest.fn().mockRejectedValue(new Error('Database error!'));

    try {
      const result = await userRepository.getUserById('1');
    } catch (error) {
      expect(error).toEqual(new Error('Database error!'));
      expect(database.query).toHaveBeenCalledTimes(1);
      expect(database.query).toHaveBeenCalledWith(
        'SELECT username, email FROM user WHERE id = ?',
        ['1']
      );
    }
  });
});

describe('userRepository - createUser', () => {
  it("should return the new user id's", async () => {
    const mockedDatabaseResponse: OkPacket[] = [
      {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0,
      },
    ];
    const mockedNewUser = {
      id: 1,
      username: 'Jane Doe',
      email: 'jane.doe@test.com',
      password: 'password123',
    };

    database.query = jest.fn().mockResolvedValue(mockedDatabaseResponse[0]);

    const result = await userRepository.createUser(mockedNewUser);

    expect(result).toBeDefined();
    expect(result).toBe(1);
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith(
      `INSERT INTO user SET username = ?, email = ?, password = ?`,
      ['Jane Doe', 'jane.doe@test.com', 'password123']
    );
  });
  it('it should throw error if the repository throws error', async () => {
    database.query = jest.fn().mockRejectedValue(new Error('Database error!'));

    try {
      const mockedNewUser = {
        id: 1,
        username: 'Jane Doe',
        email: 'jane.doe@test.com',
        password: 'password123',
      };
      const result = await userRepository.createUser(mockedNewUser);
    } catch (error) {
      expect(error).toEqual(new Error('Database error!'));
      expect(database.query).toHaveBeenCalledTimes(1);
      expect(database.query).toHaveBeenCalledWith(
        `INSERT INTO user SET username = ?, email = ?, password = ?`,
        ['Jane Doe', 'jane.doe@test.com', 'password123']
      );
    }
  });
});
