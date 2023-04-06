import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserDetails } from './user-details.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<IUserDetails | null> {
    return this.userService.findById(id);
  }
}
