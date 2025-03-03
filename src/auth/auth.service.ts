import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/users/users.model';
import { UserPayloadType } from './types/user-payload.type';

const COUNT_ITERATION_BCRYPT = 5;

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(@Body() userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  public async registration(@Body() userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'The user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcryptjs.hash(
      userDto.password,
      COUNT_ITERATION_BCRYPT,
    );

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'There is no such user.',
      });
    }

    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user?.password,
    );

    if (passwordEquals) return user;

    throw new UnauthorizedException({
      message: 'Check the data, the password or mail is entered incorrectly.',
    });
  }

  private generateToken(user: User) {
    const payload: UserPayloadType = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
