import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  @Max(2)
  @Min(0)
  priority?: number;

}
