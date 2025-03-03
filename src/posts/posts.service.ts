import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  public constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly fileService: FilesService,
  ) {}

  public async create(dto: CreatePostDto, image: Express.Multer.File) {
    const fileName = this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
