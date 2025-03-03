import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Role value must be a string' })
  @IsNotEmpty({ message: 'Role value cannot be empty' })
  public readonly value: string;

  @IsNumber({}, { message: 'User ID must be a number' })
  public readonly userId: number;
}
