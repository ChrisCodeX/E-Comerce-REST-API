import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';
import { Category, CategorySchema } from './subdocuments/category.entity';

@Schema()
export class Product extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: String })
  image: string;

  // Relation 1:1 - embedded
  @Prop({ type: CategorySchema })
  category: Record<string, Category>;

  // Relation 1:1 / Reference to brand collection
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
