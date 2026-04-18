import { ConfigService } from '@nestjs/config';
export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    discountedPrice?: number;
    category: string;
    description: string;
    nikePromo?: boolean;
    image: {
        url: string;
    };
}
export declare class ProductsService {
    private configService;
    private readonly logger;
    private client;
    constructor(configService: ConfigService);
    findAll(): Promise<Product[]>;
    findOne(slug: string): Promise<Product | null>;
}
