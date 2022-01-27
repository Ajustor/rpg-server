import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { config } from './config/config'
import { UsersModule } from './users/users.module'
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config.get('MONGODB_URI'),
        auth: config.get('DATABASE_USERNAME')
          ? {
              username: config.get('DATABASE_USERNAME'),
              password: config.get('DATABASE_PASSWORD'),
            }
          : undefined,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    UsersModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
