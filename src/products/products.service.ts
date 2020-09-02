import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const productId = (Math.random() * 10).toString();
    const newProduct = new Product(productId, title, desc, price);

    this.products.push(newProduct);

    return productId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  deleteProduct(productId: string): void {
    const [_, productIndex] = this.findProduct(productId);

    this.products.splice(productIndex, 1);
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ): null {
    const [product, productIndex] = this.findProduct(productId);
    this.products[productIndex] = {
      ...product,
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };

    return null;
  }

  private findProduct(productId): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    return [product, productIndex];
  }
}
