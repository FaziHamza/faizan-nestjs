import { ConnectionOptions } from 'mssql';

export const databaseConfig: ConnectionOptions = {
  type: 'mssql',
  server: 'localhost', // or '127.0.0.1'
  database: 'FaizanMSSQL',
  options: {
    trustedConnection: true,
  },
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
