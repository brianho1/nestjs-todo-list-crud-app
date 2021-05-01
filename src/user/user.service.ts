import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toUserDto} from '../common/mapper';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = userDto;

    const userInDb = await this.userRepo.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepo.create({
      email,
      password,
    });

    await this.userRepo.save(user);

    return toUserDto(user);
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }


  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
