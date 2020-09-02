import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const productId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return {
      id: productId,
    };
  }

  @Get()
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string): Product {
    return this.productsService.getProduct(productId);
  }
}
