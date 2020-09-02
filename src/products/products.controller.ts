import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): void {
    this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string): null {
    this.productsService.deleteProduct(productId);

    return null;
  }
}
