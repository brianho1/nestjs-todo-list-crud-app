import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity'
import { Repository } from 'typeorm';
import { ListDto } from './dto/list.dto';
import { UserDto} from '../user/dto/user.dto'
import { UserService } from '../user/user.service'
import { toListDto } from '../common/mapper';
import { CreateListDto} from './dto/list.create.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { AllListDto } from './dto/all.list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
    private readonly userService: UserService,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<List>> {

    const queryBuilder = this.listRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); 

    return paginate<List>(this.listRepo, options);
  }

  async getAllLists(): Promise<ListDto[]> {
    const lists = await this.listRepo.find({ relations: ['owner'] });
    return lists.map(list => toListDto(list));
  }

  async getOneList(id: number): Promise<ListDto> {
      const list = await this.listRepo.findOne({
          where: {id},
          relations: ['tasks', 'owner',]
      })

      if (!list) {
          throw new HttpException(
              `List doesnt exist`,
              HttpStatus.BAD_REQUEST
          )
      }

      return toListDto(list);
  }

  async createList(
    { id, email }: UserDto,
    createListDto: CreateListDto,
  ): Promise<ListDto> {
    const { name, description } = createListDto;
    const owner = await this.userService.findOne({ where: { id, email } });
    const list: List = await this.listRepo.create({
      name,
      description,
      owner,
    });
    await this.listRepo.save(list);
    return toListDto(list);
  }

  async updateList(id: number, listDto: ListDto): Promise<ListDto> {
    const { name, description } = listDto;

    let list: List = await this.listRepo.findOne({ where: { id } });

    if (!list) {
      throw new HttpException(
        `List doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    list = {
      id,
      name,
      description
    };

    await this.listRepo.update({ id }, list); // update

    list = await this.listRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    });

    return toListDto(list);
  }

  async deleteList(id: number): Promise<ListDto> {
    const list: List = await this.listRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    });

    if (!list) {
      throw new HttpException(
        `list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (list.tasks && list.tasks.length > 0) {
      throw new HttpException(
        `Delete existing tasks before deleting this list`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.listRepo.delete({ id }); // delete todo list

    return toListDto(list);
  }


}
