import { User } from "src/user/user.entity";
import { ListDto } from "../list/dto/list.dto";
import { UserDto } from "../user/dto/user.dto";
import { List } from "../list/list.entity"
import { Task } from "src/task/task.entity";
import { TaskDto } from "src/task/dto/task.dto";

export const toListDto = (data: List): ListDto => {
    const { id, name, description, owner } = data;
  
    let listDto: ListDto = {
      id,
      name,
      description,
      owner: owner ? toUserDto(owner) : null,
    };
    
    return listDto;
  };

  export const toTaskDto = (data: Task): TaskDto => {
    const { id, name } = data;
  
    let taskDto: TaskDto = {
      id,
      name,
    };
  
    return taskDto;
  };
  
  export const toUserDto = (data: User): UserDto => {
    const { id, email } = data;
  
    let userDto: UserDto = {
      id,
      email,
    };
  
    return userDto;
  };
  