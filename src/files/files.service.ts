import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  public createFile(file: Express.Multer.File): string {
    if (!file || typeof file.originalname !== 'string') {
      throw new HttpException('Invalid file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error: unknown) {
      throw new HttpException(
        `An error occurred when writing the file: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
