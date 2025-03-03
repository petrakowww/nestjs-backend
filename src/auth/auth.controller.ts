import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  public registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
