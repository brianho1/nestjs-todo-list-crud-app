import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
  ParseIntPipe
} from "@nestjs/common";
import { Pagination } from 'nestjs-typeorm-paginate';
import { ListService } from "./list.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ListDto } from "./dto/list.dto";
import { AllListDto } from "./dto/all.list.dto";
import { CreateListDto } from "./dto/list.create.dto";
import { UserDto } from "src/user/dto/user.dto";
import { List } from "./list.entity";

@UseGuards(JwtAuthGuard)
@Controller("lists")
export class ListController {
  constructor(private readonly listService: ListService) {}


  @Get()
  async findAll(@Req() req: any): Promise<AllListDto> {
    const lists = await this.listService.getAllLists();
    return { lists };
  }

  @Get('paginate')
  async index(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 100,
  ): Promise<Pagination<List>> {
    limit = limit > 100 ? 100 : limit;
    return this.listService.paginate({
      page,
      limit,
      // route: 'http://localhost:3000.com/lists',
    });
  }



  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ListDto> {
    return await this.listService.getOneList(id);
  }

  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @Req() req: any,
  ): Promise<ListDto> {
    console.log(req);
    const user = req.user as UserDto;
    return await this.listService.createList(user, createListDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() listDto: ListDto,
  ): Promise<ListDto> {
    return await this.listService.updateList(id, listDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: number): Promise<ListDto> {
    return await this.listService.deleteList(id);
  }


}
