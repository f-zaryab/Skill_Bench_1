import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../application/dtos/create-user.dto';
import { UsersService } from '../application/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserDTO) {
    return this.userService.createUser(request);
  }
}
