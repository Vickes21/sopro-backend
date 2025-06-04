import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod/v4';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodType);
    transform(value: unknown, metadata: ArgumentMetadata): unknown;
}
