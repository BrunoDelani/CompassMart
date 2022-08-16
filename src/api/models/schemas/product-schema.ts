import { IProduct } from '../interfaces/product-interface';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, min: 0.01, max: 1000, required: true },
  qtd_stock: { type: Number, max: 100000, required: true },
  stock_control_enabled: { type: Boolean, required: true },
  bar_codes: { type: String, max: 13, unique: true, required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      return {
        id: ret._id,
        title: ret.title,
        description: ret.description,
        department: ret.department,
        brand: ret.brand,
        price: ret.price,
        qtd_stock: ret.qtd_stock,
        stock_control_enabled: ret.stock_control_enabled,
        bar_codes: ret.bar_codes,
        created_at: ret.created_at,
        update_at: ret.update_at
      };
    }
  }
});

export default model<IProduct>('product', ProductSchema);
