import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
    }
    return user;
  }

  public async getAllUser() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  public async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException(
      'The user or role was not found',
      HttpStatus.NOT_FOUND,
    );
  }

  public async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (user) {
      user.banned = true;
      user.banReason = dto.description;
      await user.save();
      return user;
    }

    throw new HttpException('The user was not found', HttpStatus.NOT_FOUND);
  }
}
