import { Types } from 'mongoose';

export interface IProductRequest {
    title: string;
    description: string;
    department: string;
    brand: string;
    price: number;
    qtd_stock: number;
    bar_codes: string;
}

export interface IProductReponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    department: string;
    brand: string;
    price: number;
    qtd_stock: number;
    stock_control_enabled: boolean;
    bar_codes: string;
    created_at: Date;
    updated_at: Date;
}
