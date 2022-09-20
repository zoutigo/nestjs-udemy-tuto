import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  title?: string;
  description?: string;

  image?: string;

  price?: number;
}
