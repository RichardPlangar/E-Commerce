import { userRepository } from '../repositories/userRepository';
import { UserDomainModel } from '../models/domain/UserDomainModel';
import user from '../routes/user';

const userService = {
  async getUserByEmail(email: string): Promise<UserDomainModel | undefined> {
    const userByEmail: UserDomainModel | undefined =
      await userRepository.getUserByEmail(email);
    if (userByEmail) {
      return userByEmail;
    }
    return undefined;
  },
  async usernameAndEmailCheck(
    username: string,
    email: string
  ): Promise<boolean> {
    const usernameIsExist = await userRepository.getUserByUsername(username);
    const emailIsExist = await userRepository.getUserByEmail(email);

    if (usernameIsExist || emailIsExist) {
      throw new Error('The username or the email already exist!');
    }
    return true;
  },
  async createUserService(user: UserDomainModel) {
    const newInsertedUser = await userRepository.createUser(user);
    const registeredUser = await userRepository.getUserById(
      newInsertedUser as unknown as string
    );
    return { username: registeredUser.username, email: registeredUser.email };
  },
  async userLogin(username: string, password: string) {
    const userValdation = await userRepository.getUserByUsername(username);
    if (!userValdation) {
      throw new Error('The username does not exist');
    }
    if (password !== userValdation.password) {
      throw new Error('Invalid password');
    }
    const validatedUser = {
      username: userValdation.username,
      email: userValdation.email,
    };
    return validatedUser;
  },
};

export { userService };
