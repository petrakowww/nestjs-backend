import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'ivan.example@yandex.ru',
    description: 'Unique email of user',
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  public readonly email: string;

  @ApiProperty({
    example: 'your-secret-password',
    description: 'Secret password of user',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 50, { message: 'Password must be between 6 and 50 characters' })
  public readonly password: string;
}
