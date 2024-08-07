/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class PriceSchema extends Document {
    @Prop()
    itemId: number;

    @Prop()
    unitPrice: number;

    @Prop()
    supportedDensity: number;

    @Prop()
    createAt: Date;

    @Prop()
    updatedAt: Date;
}

export const PricingModel = SchemaFactory.createForClass(PriceSchema);
