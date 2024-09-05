import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'aws-0-us-west-1.pooler.supabase.com',
        port: 6543,
        username: 'postgres.nbxipzavgwtdhmifldsv',
        password: 'GnueEeC1Zf9ElxQT',
        database: 'postgres',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];