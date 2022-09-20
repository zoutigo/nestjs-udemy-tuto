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

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get()
  async findAll(@Query('page') page = 1) {
    return this.productService.paginate(page);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productService.update(+id, body);
    return this.productService.findOne({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
