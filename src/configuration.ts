import * as dotenv from 'dotenv';
const cfg_path = process.env.NODE_ENV === 'production' ? '.env.prd' : '.env'
const csvToArray = (csv: string): string[] =>
  csv.split(',').map((value) => value.trim());
dotenv.config({
  path: cfg_path,
});
export default () => ({
  port: parseInt(process.env.PORT, 10) || 1337,
  cors: {
    origin: csvToArray(process.env.CORS_ORIGINS),
  },
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
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRY,
  },
  entitiesSourceDir: ['src/entity'],
  migrationsSourceDir: ['src/migration'],
  subscribersSourceDir: ['src/subscriber'],
});
