import { Module, Global } from '@nestjs/common';
// Mongo connection
// import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from 'config';

const API_KEY_DEV = 'dev_123';
const API_KEY_PROD = 'prod_321';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        // Mongoose Configurations from config
        const { connection, user, password, port, host, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'dev' ? API_KEY_DEV : API_KEY_PROD,
    },
    // Mongo Connection
    // {
    //   provide: 'MONGO',
    //   useFactory: async (configService: ConfigType<typeof config>) => {
    //     // Mongo Configurations from config
    //     const { connection, user, password, port, host, dbName } =
    //       configService.mongo;

    //     const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT&tls=false`;
    //     const client = new MongoClient(uri);
    //     await client.connect();
    //     const database = client.db(`${dbName}`);
    //     return database;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
