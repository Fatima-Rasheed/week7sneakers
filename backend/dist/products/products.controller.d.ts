import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("./products.service").Product[]>;
    findOne(slug: string): Promise<import("./products.service").Product | null>;
}
