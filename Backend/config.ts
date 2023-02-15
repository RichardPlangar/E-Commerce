import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    accessTokenSecretKey:
      process.env.JWT_ACCESS_TOKEN_KEY || 'hDKAFAKBFLBFGLJKGRF',
  },
};
