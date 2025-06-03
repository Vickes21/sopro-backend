import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod/v4';

@Injectable()
export class ZodValidationPipe implements PipeTransform {

  constructor(private schema: ZodType) { }


  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value)
    if (result.success) {
      return result.data;
    }
    throw new BadRequestException({
      message: "Dados inválidos",
      code: 422,
      errors: result.error.issues,
    });
  }
}
