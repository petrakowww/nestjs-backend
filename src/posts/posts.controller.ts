import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  public constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postService.create(dto, image);
  }
}
