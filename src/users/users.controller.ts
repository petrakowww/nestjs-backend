import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post()
  public create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  public getAll() {
    return this.usersService.getAllUser();
  }

  @ApiOperation({ summary: 'Add new role for user' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  public addRole(@Body() roleDto: AddRoleDto) {
    return this.usersService.addRole(roleDto);
  }

  @ApiOperation({ summary: 'Add new role for user' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/ban')
  public banUser(@Body() banUserDto: BanUserDto) {
    return this.usersService.banUser(banUserDto);
  }
}
