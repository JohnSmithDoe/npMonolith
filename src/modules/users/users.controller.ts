import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SerializeRespondInterceptor } from '../../common/interceptors/serialize-respond.interceptor';
import { CreateUserDto } from './dtos/req/create-user.dto';
import { UpdateUserDto } from './dtos/req/update-user.dto';
import { UserResponseDto } from './dtos/res/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseInterceptors(new SerializeRespondInterceptor(UserResponseDto))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseInterceptors(new SerializeRespondInterceptor(AdminUserDto))
  findAll() {
    return this.usersService.findAll();
  }

  @Get('details')
  findAllWithDetails() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
