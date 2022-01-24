import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { config } from './config/config'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config.get('MONGODB_URI'),
        auth: config.get('DATABASE_USERNAME')
          ? {
              user: config.get('DATABASE_USERNAME'),
              password: config.get('DATABASE_PASSWORD'),
            }
          : undefined,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: 10,
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
