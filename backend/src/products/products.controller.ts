import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() product: Product) {
        this.productsService.create(product);
    }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product) {
        this.productsService.update(id, product);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.productsService.delete(id);
    }

    @Post(':id/buy')
    async buy(@Param('id') id: string) {
        this.productsService.buy(id);
    }
}