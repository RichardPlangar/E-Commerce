import mysql from 'mysql';
import config from '../config';

const databaseConnection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  port: config.mysql.port,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const database = {
  checkConnection(): void {
    databaseConnection.connect((err) => {
      if (err) {
        console.error('Cannot connect to the database', err);
        return;
      }
      console.log('Database Connection is OK');
    });
  },

  query<T>(query: string, values: string[] = []): Promise<T> {
    return new Promise((resolve, reject) => {
      databaseConnection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(JSON.stringify(result)));
      });
    });
  },
};

export default database;
