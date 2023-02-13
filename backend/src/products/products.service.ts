import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }

    async create(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async update(id: string, product: Product): Promise<void> {
        await this.productRepository.update(id, product);
    }

    async delete(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }

    async buy(id: string): Promise<void> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        if (product.quantity === 0) {
            throw new HttpException('Out of stock', HttpStatus.BAD_REQUEST);
        }
        product.quantity--;
        await this.productRepository.save(product);
    }
}