import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./schemas/product.schema";
import { FilterGalvalume } from "src/interfaces/filterGalvalume";
import { RedisCacheService } from "../redisCache/redis-cache.service";
import { log } from "console";

@Injectable()
export class ProductService {
    private readonly cacheKeys = {
        surfaceCoatingLayer: "surfaceCoatingLayer",
        keyZAZCoating: "ZAZCoating",
        color: "color",
    };
    constructor(
        private readonly redisCacheService: RedisCacheService,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
    ) {}
    async findAll() {
        return await this.productModel.find().exec();
    }
    async findItem(field: string): Promise<Product> {
        return await this.productModel.distinct(field).lean();
    }
    async findGalvalume(): Promise<any> {
        return this.getCacheOrFetch(
            this.cacheKeys.surfaceCoatingLayer,
            this.cacheKeys.keyZAZCoating,
        );
    }
    async findGalvanized(): Promise<any> {
        return this.getCacheOrFetch(
            this.cacheKeys.surfaceCoatingLayer,
            this.cacheKeys.color,
        );
    }
    private async getCacheOrFetch(...keys: string[]): Promise<any> {
        const results: { [key: string]: any } = {};

        const cacheResults = await Promise.all(
            keys.map((key) => this.redisCacheService.get(key)),
        );

        keys.forEach((key, index) => {
            results[key] = cacheResults[index];
        });

        const keysToFetch = keys.filter((key, index) => !cacheResults[index]);

        const fetchedResults = await Promise.all(
            keysToFetch.map((key) => this.findItem(key)),
        );

        const cacheUpdatePromises = keysToFetch.map((key, index) => {
            const fetchedResult = fetchedResults[index];
            results[key] = fetchedResult;
            return this.redisCacheService.set(
                key,
                JSON.stringify(fetchedResult),
            );
        });
        await Promise.all(cacheUpdatePromises);
        return results;
    }
    async filterProducts(query: { [key: string]: any }): Promise<any> {
        return await this.productModel
            .find(query)
            .distinct("descriptions")
            .lean()
            .exec();
    }
    async filterGalvanize({
        color,
        ZAZCoating,
    }: {
        color: string;
        ZAZCoating: string;
    }): Promise<any> {
        return this.filterProducts({ color, ZAZCoating });
    }

    // Specific method for galvalume products
    async filterGalvalume({
        surfaceCoatingLayer,
        ZAZCoating,
    }: {
        surfaceCoatingLayer: string;
        ZAZCoating: string;
    }): Promise<any> {
        return this.filterProducts({ surfaceCoatingLayer, ZAZCoating });
    }
}
