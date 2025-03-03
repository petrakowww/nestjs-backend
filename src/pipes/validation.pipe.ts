import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.isClass(metadata.metatype)) {
      return value;
    }

    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        const constraints = err.constraints
          ? Object.values(err.constraints).join(', ')
          : 'Invalid value';
        return `${err.property} - ${constraints}`;
      });

      throw new ValidationException(messages);
    }

    return value;
  }

  private isClass(metatype: unknown): metatype is ClassConstructor<object> {
    if (typeof metatype !== 'function') return false;

    return (
      typeof metatype.prototype === 'object' &&
      metatype.prototype !== null &&
      Object.getPrototypeOf(metatype.prototype) !== null
    );
  }
}
