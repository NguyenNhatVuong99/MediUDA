import { Body, Controller, Get, Post } from "@nestjs/common";
import { FilterGalvalume } from "src/interfaces/filterGalvalume";
import { FilterGalvanize } from "src/interfaces/FilterGalvanize";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }
    @Get("/galvalume")
    async findGalvalume() {
        return await this.productService.findGalvalume();
    }
    // @Post("galvalume")
    // filterGalvalume(
    //     @Body()
    //     {
    //         surfaceCoatingLayer: surfaceCoatingLayer,
    //         ZAZCoating: ZAZCoating,
    //     }: FilterGalvalume,
    // ) {
    //     return this.productService.filterGalvalume({
    //         surfaceCoatingLayer: surfaceCoatingLayer,
    //         ZAZCoating: ZAZCoating,
    //     });
    // }
    @Get("/galvanized")
    async findGalvanized() {
        return await this.productService.findGalvanized();
    }
    @Post("galvanized")
    filterGalvanize(
        @Body() { color: color, ZAZCoating: ZAZCoating }: FilterGalvanize,
    ) {
        return this.productService.filterGalvanize({
            color: color,
            ZAZCoating: ZAZCoating,
        });
    }
}
