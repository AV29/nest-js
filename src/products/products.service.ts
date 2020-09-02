import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, desc, price);

    this.products.push(newProduct);

    return productId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const product = this.products.find(product => product.id === productId);
    if(!product) {
      throw new NotFoundException('Could not find product');
    }
    return { ...product };
  }
}
