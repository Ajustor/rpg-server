import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { config } from './config/config'
import { PlayersModule } from './players/players.module'
import { UsersModule } from './users/users.module'

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
