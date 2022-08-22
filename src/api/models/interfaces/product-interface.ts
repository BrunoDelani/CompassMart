import { Types } from 'mongoose';
export interface IProduct {
    title: String;
    description: String;
    department: String;
    brand: String;
    price: Number;
    qtd_stock: Number;
    stock_control_enabled: Boolean;
    bar_codes: String;
    created_at: Date;
    updated_at: Date;
}
export interface IProductResponse {
    _id: Types.ObjectId;
    title: String;
    description: String;
    department: String;
    brand: String;
    price: Number;
    qtd_stock: Number;
    stock_control_enabled: Boolean;
    bar_codes: String;
    created_at: Date;
    updated_at: Date;
}
export interface IProductQuery {
    department?: String;
    brand?: String;
    page?: number;
    limit?: number;
}
export interface IProductPatch {
    title?: String;
    description?: String;
    department?: String;
    brand?: String;
    price?: Number;
    qtd_stock?: Number;
    stock_control_enabled?: Boolean;
    bar_codes?: String;
    created_at?: Date;
    updated_at?: Date;
}
export interface IVerifyProduct {
    verify: boolean,
    messages: [String]
}

export interface IResultInsertProducts {
    success: Number,
    errors: Number,
    error_details?: [{
        title: String,
        bar_codes: String,
        errors: [String]
    }]
}
