import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  createdOn?: Date;
}
