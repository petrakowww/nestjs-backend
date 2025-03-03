import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role type of user',
  })
  @IsString({ message: 'Role value must be a string' })
  @IsNotEmpty({ message: 'Role value cannot be empty' })
  public readonly value: string;

  @ApiProperty({
    example: 'Administrator - its a role, that...',
    description: 'Description of role',
  })
  @IsString({ message: 'Role description must be a string' })
  @IsNotEmpty({ message: 'Role description cannot be empty' })
  public readonly description: string;
}
