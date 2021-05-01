import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { User } from 'src/user/user.entity';
import { Task } from './task.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([List, User, Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],

})
export class TaskModule {}
