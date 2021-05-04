import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import {AuthModule} from './auth/auth.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { List } from './list/list.entity';
import { Task } from './task/task.entity';
import { config } from 'dotenv'

config();
const entities = [User, List, Task];
@Module({
  imports: [TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
  }), UserModule, AuthModule, ListModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}


