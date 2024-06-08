import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async showAllUsers() {
    const user = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Showing all users',
      data: user,
    };
  }

  @Post()
  async createUsers(@Body() userData: UserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User added successfully',
      data: await this.usersService.create(userData),
    };
  }

  @Get(':id')
  async readUser(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.readOne(id),
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<UserDto>,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.update(id, userData),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.delete(id),
    };
  }
}
