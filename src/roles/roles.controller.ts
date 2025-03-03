import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  public constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: [Role] })
  @Post()
  @HttpCode(HttpStatus.OK)
  public create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  @HttpCode(HttpStatus.OK)
  public getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
