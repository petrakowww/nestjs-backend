import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My first post',
    description: 'Title of the post',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  public readonly title: string;

  @ApiProperty({
    example: 'This is the content of my first post...',
    description: 'Content of the post',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  public readonly content: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who created the post',
  })
  @IsInt({ message: 'User ID must be an integer' })
  @Type(() => Number)
  public readonly userId: number;

  public readonly image: Express.Multer.File;
}
