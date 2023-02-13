import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: null })
    name: string;

    @Column({ default: null })
    description: string;

    @Column({ default: null })
    price: number;

    @Column({ default: null })
    quantity: number;

    @Column({ default: null })
    image: string;
}