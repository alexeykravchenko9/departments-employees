import { config } from 'dotenv';
config();

const configApp = () => {

  return {
      hostname: process.env.APP_HOST,
      port: process.env.APP_PORT,
      jwtsecret: process.env.JWT_SECRET,
      db: {
        hostname: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
      }
    }
};

export default configApp;