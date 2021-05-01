import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AllTaskDto } from './dto/all.task.dto';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/task.create.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async findOneTask(@Param('id') id: number): Promise<TaskDto> {
    return await this.taskService.getTask(id);
  }

  @Get('list/:id')
  async findTaskByList(@Param('id') id: number): Promise<AllTaskDto> {
    const tasks = await this.taskService.getTasksByList(id);
    return { tasks };
  }

  @Post('list/:id')
  async create(
    @Param('id') id: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.createTask(id, createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskDto: TaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.updateTask(id, taskDto);
  }


  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<TaskDto> {
    return await this.taskService.deleteTask(id);
  }
}