import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from './list.entity'
import { User } from 'src/user/user.entity';
import { Task } from 'src/task/task.entity';
import { TaskController } from 'src/task/task.controller';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([List, User, Task])],
  controllers: [ListController, TaskController, UserController],
  providers: [ListService, TaskService, UserService],
  exports: [ListService],

})
export class ListModule {}
