import { DataSource } from 'typeorm';
import config from './configuration';
// @ts-ignore
export const dataSource = new DataSource(config().database);
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const pre_db = Date.now();
      return dataSource
        .initialize()
        .then(() => {
          console.info(
            `Data Source has been initialized in ${
              (Date.now() - pre_db) / 1000
            } seconds!`,
          );
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });
    },
  },
];
