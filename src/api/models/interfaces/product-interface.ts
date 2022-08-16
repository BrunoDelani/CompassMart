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
}

export interface IProductReponse {
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
