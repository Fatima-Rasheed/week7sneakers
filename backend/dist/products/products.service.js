"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_request_1 = require("graphql-request");
let ProductsService = ProductsService_1 = class ProductsService {
    configService;
    logger = new common_1.Logger(ProductsService_1.name);
    client;
    constructor(configService) {
        this.configService = configService;
        const url = this.configService.get('HYGRAPH_URL') ?? '';
        const token = this.configService.get('HYGRAPH_TOKEN');
        this.client = new graphql_request_1.GraphQLClient(url);
    }
    async findAll() {
        const query = (0, graphql_request_1.gql) `
      query GetProducts {
        sneakers {
          id
          name
          slug
          price
          discountedPrice
          category
          description
          nikePromo
          image {
            url
          }
        }
      }
    `;
        try {
            const data = await this.client.request(query);
            return data.sneakers;
        }
        catch (error) {
            this.logger.error('Failed to fetch products from Hygraph', error);
            throw error;
        }
    }
    async findOne(slug) {
        const query = (0, graphql_request_1.gql) `
      query GetProduct($slug: String!) {
        sneaker(where: { slug: $slug }) {
          id
          name
          slug
          price
          discountedPrice
          category
          description
          nikePromo
          image {
            url
          }
        }
      }
    `;
        try {
            const data = await this.client.request(query, {
                slug,
            });
            return data.sneaker;
        }
        catch (error) {
            this.logger.error(`Failed to fetch product ${slug} from Hygraph`, error);
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ProductsService);
//# sourceMappingURL=products.service.js.map