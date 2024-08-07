/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class WarehouseSchema extends Document {

    @Prop({ _id: false })
    coilID: number;

    @Prop()
    receiptDate: number;

    @Prop()
    itemId: number;

    @Prop()
    supplierCoilID: number;

    @Prop()
    plating: string;

    @Prop()
    netWeightKg: number;

    @Prop()
    grossWeightKg: number;

    @Prop()
    amount: number;

    @Prop()
    actualDensity: number;

    @Prop()
    prime: string;

    @Prop()
    lengthA: number;

    @Prop()
    lengthC: number;

    @Prop()
    fixedDensity: number;

    @Prop()
    storageLocation: string;

    @Prop()
    note: string;

    @Prop()
    thicknessByWidth: number;

    @Prop()
    ageOfInventory: string;

    @Prop()
    reportCLC: string;

    @Prop()
    supplierName: string;

    @Prop()
    inputInterpretation: string

    @Prop()
    order: string;

    @Prop()
    orderID: string;

    @Prop()
    customer: string;

    @Prop()
    warehouseCode: number;

    @Prop()
    orderStatus: number;

    @Prop()
    standardPacking: boolean;

    @Prop()
    createAt: Date;

    @Prop()
    updatedAt: Date;

}

export const WarehouseModel = SchemaFactory.createForClass(WarehouseSchema);
