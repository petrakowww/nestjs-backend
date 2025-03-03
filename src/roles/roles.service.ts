import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  public constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  public async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  public async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
