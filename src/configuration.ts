import * as dotenv from 'dotenv';

dotenv.config();
export default () => ({
  port: parseInt(process.env.PORT, 10) || 1337,
  database: {
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/entity/*.js'],
    migrations: ['dist/migration/*.js'],
    subscribers: ['dist/subscriber/*.js'],
  },
  allowableOrigins: process.env.ALLOWABLE_ORIGINS,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  entitiesSourceDir: ['src/entity'],
  migrationsSourceDir: ['src/migration'],
  subscribersSourceDir: ['src/subscriber'],
});
