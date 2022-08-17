import { IProduct, IProductResponse } from '../interfaces/product-interface';
import mongoose, { Schema, model } from 'mongoose';
import ProductRules from '../../../utils/product-rules';
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, min: ProductRules.minPrice, max: ProductRules.maxPrice, required: true },
  qtd_stock: { type: Number, max: ProductRules.maxStock, required: true },
  stock_control_enabled: { type: Boolean, required: true },
  bar_codes: { type: String, minlength: ProductRules.barCodesLength, maxlength: ProductRules.barCodesLength, unique: true, required: true }
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

ProductSchema.plugin(paginate);
export default model<IProduct, mongoose.PaginateModel<IProductResponse>>('product', ProductSchema);
