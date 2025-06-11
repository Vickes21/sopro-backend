import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation/zod-validation.pipe';
import { updateUserSchema, TUpdateUser } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getBy('id', +id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() updateUserDto: TUpdateUser) {
    return this.usersService.update(+id, updateUserDto);
  }
}
