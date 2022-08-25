export default () => ({
  port: parseInt(process.env.PORT, 10) || 1337,
  database: {
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/entity/*.js'],
    migrations: ['dist/migration/*.js'],
    subscribers: ['dist/subscriber/*.js'],
    cli: {
      entitiesDir: process.env.TYPEORM_ENTITIES_DIR?.split('|'),
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR?.split('|'),
      subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR?.split('|'),
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
