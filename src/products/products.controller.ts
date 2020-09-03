import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<{ id: string }> {
    const productId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return {
      id: productId,
    };
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string): Promise<Product> {
    return await this.productsService.getProduct(productId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<void> {
    await this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string): Promise<void> {
    await this.productsService.deleteProduct(productId);
  }
}
