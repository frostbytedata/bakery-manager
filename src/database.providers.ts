import { DataSource } from 'typeorm';
import config from './configuration'
// @ts-ignore
export const dataSource = new DataSource(config().database);
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
