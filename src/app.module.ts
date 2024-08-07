import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./modules/products/product.module";
import { RedisCacheModule } from "./modules/redisCache/redis-cache.module";
import { RedisCacheService } from "./modules/redisCache/redis-cache.service";
const url =
    "mongodb+srv://nhatvuong:nhatvuong99@cluster0.oaomex9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

@Module({
    imports: [
        MongooseModule.forRoot(url, {
            dbName: "lunasteel",
        }),
        RedisCacheModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
