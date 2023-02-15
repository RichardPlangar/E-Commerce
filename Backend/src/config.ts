import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    accessTokenSecretKey:
      process.env.JWT_ACCESS_TOKEN_KEY || 'hDKAFAKBFLBFGLJKGRF',
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(process.env.MYSQL_PORT!),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
