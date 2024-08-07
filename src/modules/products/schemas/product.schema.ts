import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: false, _id: false })
    _id: number;

    @Prop({ required: true })
    group: string;
    @Prop({ required: true })
    group2: string;

    @Prop({ required: true })
    grade: string;

    @Prop({ required: true })
    standard: string;

    @Prop({ required: true })
    baseSteelThickness: number;

    @Prop({ required: true })
    postGalvanizationThickness: number;

    @Prop({ required: false })
    postPaintThickness?: number;

    @Prop({ required: false })
    pipeWallThickness?: number;

    @Prop({ required: true })
    width: number;

    @Prop({ required: false })
    diameter?: string;

    @Prop({ required: true })
    ZAZCoating: string;

    @Prop({ required: true })
    paintCoatingWeight: number;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    primaryPaintColorCode: string;

    @Prop({ required: true })
    backPaintColorCode: string;

    @Prop({ required: false })
    length?: number;

    @Prop({ required: true })
    shape: string;

    @Prop({ required: true, index: true })
    surfaceCoatingLayer: string;

    @Prop({ required: false })
    glossiness?: number;

    @Prop({ required: false })
    conversionRatio?: number;

    @Prop({ required: true })
    lowerDimensionalTolerance: number;

    @Prop({ required: true })
    upperDimensionalTolerance: number;

    @Prop({ required: true, index: true })
    alloyCode: string;

    @Prop({ required: true })
    revision: number;

    @Prop({ required: true })
    revisionTrack: number;

    @Prop({ required: true })
    stocked: boolean;

    @Prop({ required: true })
    UM: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    source: string;

    @Prop({ required: true })
    productCode: string;

    @Prop({ required: true })
    ABCCode: string;

    @Prop({ required: true })
    costType: string;

    @Prop({ required: true })
    costMethod: string;

    @Prop({ required: true })
    activeforDataIntegration: boolean;

    @Prop({ required: true })
    acceptRequirement: boolean;

    @Prop({ required: true })
    passrequirement: boolean;

    @Prop({ required: true })
    lotTrack: boolean;

    @Prop({ required: true })
    reservable: boolean;

    @Prop({ required: true })
    descriptions: string;

    @Prop({ required: true })
    createAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
