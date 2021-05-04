import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  @Max(2)
  @Min(0)
  priority?: number;

  createdOn?: Date;
}
