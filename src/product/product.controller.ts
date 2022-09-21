import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HasPermission('products')
  async create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get()
  @HasPermission('products')
  async findAll(@Query('page') page = 1) {
    return this.productService.paginate(page);
  }

  @Get(':id')
  @HasPermission('products')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @HasPermission('products')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productService.update(+id, body);
    return this.productService.findOne({ id });
  }

  @Delete(':id')
  @HasPermission('products')
  remove(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
