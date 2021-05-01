import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class ListDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
  description?: string;
  owner: UserDto;
  createdAt?: Date;

}
