import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private static normalizeProduct(product: Product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map(ProductsService.normalizeProduct) as Product[];
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.findProduct(productId);
    return ProductsService.normalizeProduct(product) as Product;
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if(result.n === 0) {
      throw new NotFoundException('Could not find product');
    }
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ): Promise<void> {
    const product = await this.findProduct(productId);

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;

    await product.save();
  }

  private async findProduct(id): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }

    return product;
  }
}
