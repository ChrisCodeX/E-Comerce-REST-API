import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/users/entities/customer.entity';

// Order schema for DB
@Schema()
export class Order extends Document {
  /* Schema properties */
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  // Other way
  // @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Types.ObjectId>;
}

// Order schema creation
export const OrderSchema = SchemaFactory.createForClass(Order);
