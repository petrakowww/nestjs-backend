import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class BanUserDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  public readonly userId: number;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  public readonly description: string;
}
