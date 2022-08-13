import { database } from '../data/connection';
import { OkPacket } from 'mysql';
import { UserDomainModel } from '../models/domain/UserDomainModel';

const userRepository = {
  async getUserByUsername(username: string) {
    const sqlQuery = 'SELECT * FROM user WHERE username = ?';
    const getExistingUser = await database.query<UserDomainModel[]>(sqlQuery, [
      username,
    ]);
    return getExistingUser[0];
  },
  async getUserByEmail(email: string) {
    const userQuery = 'SELECT * FROM user WHERE email = ?';
    const getExistingEmail = await database.query<UserDomainModel[]>(
      userQuery,
      [email]
    );
    return getExistingEmail[0];
  },
  async getUserById(id: string): Promise<UserDomainModel> {
    const sqlQuery = 'SELECT username, email FROM user WHERE id = ?';
    const getUser = await database.query<UserDomainModel[]>(sqlQuery, [id]);
    return getUser[0];
  },
  async createUser(user: UserDomainModel) {
    const sqlQuery = `INSERT INTO user SET username = ?, email = ?, password = ?`;
    const insertUser: OkPacket = await database.query<OkPacket>(sqlQuery, [
      user.username,
      user.email,
      user.password,
    ]);
    return insertUser.insertId;
  },
};

export { userRepository };
