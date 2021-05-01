import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.create.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { toTaskDto } from '../common/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../list/list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(List)
    private readonly todoRepo: Repository<List>,
  ) {}

  async getTask(id: number): Promise<TaskDto> {
    const task: Task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toTaskDto(task);
  }

  async getTasksByList(id: number): Promise<TaskDto[]> {
    const tasks: Task[] = await this.taskRepo.find({
      where: { todo: { id } },
      relations: ['list'],
    });

    return tasks.map(task => toTaskDto(task));
  }

  async createTask(listId: number, taskDto: CreateTaskDto): Promise<TaskDto> {
    const { name, priority } = taskDto;

    const list: List = await this.todoRepo.findOne({
      where: { id: listId },
      relations: ['tasks', 'owner'],
    });

    const task: Task = await this.taskRepo.create({
      name,
      priority,
      list,
    });

    await this.taskRepo.save(task);

    return toTaskDto(task);
  }

  async updateTask(id: number, taskDto: TaskDto): Promise<TaskDto> {
    const { name, priority} = taskDto;

    let task: Task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(
        `Task doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    task = {
      id,
      name,
      priority
    };

    await this.taskRepo.update({ id }, task); // update

    task = await this.taskRepo.findOne({
      where: { id },
      relations: ['list',],
    });

    return toTaskDto(task);
  }

  async deleteTask(id: number): Promise<TaskDto> {
    const task: Task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.taskRepo.delete({ id });

    return toTaskDto(task);
  }
}
