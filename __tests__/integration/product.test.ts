import request from 'supertest';
import app from "../../src/app";
var faker = require("faker");

let server = request(app);
jest.setTimeout(60000);

const UserToLogin = {
    "email": "user_test@compasso.com.br",
    "password": "123456"
}
const ProductExample = {
    "title": "Azeites, Óleos e Vinagres",
    "description": "Óleo de Soja Soya Garrafa 900ml",
    "department": "Mercearia",
    "brand": "Soya",
    "price": 99.99,
    "qtd_stock": 99999,
    "bar_codes": "1112223334445"
}
const ProductExampleLowStock = {
    "title": "Azeites, Óleos e Vinagres",
    "description": "Óleo de Soja Soya Garrafa 900ml",
    "department": "Mercearia",
    "brand": "Soya",
    "price": 99.99,
    "qtd_stock": 10,
    "bar_codes": "5111222333444"
}
const PageNotFound = {
    page: -1,
    limit: -1
}

describe('GET /product', () => {
    test('should return all products', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`)
        const response = await server.get('/api/v1/product').set('Authorization', `Bearer ${login._body.token}`)
        await server.delete(`/api/v1/product/${ createProduct._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(200);
    });

    test('should return not products found' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get('/api/v1/product').set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });

    test('should return page not found with invalid page' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get(`/api/v1/product/?page=${PageNotFound.page}`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });

    test('should return page not found with invalid limit of results' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get(`/api/v1/product/?limit=${PageNotFound.limit}`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /product/low_stock', () => {
    test('should return all products with low stock', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const createProduct = await server.post('/api/v1/product').send(ProductExampleLowStock).set('Authorization', `Bearer ${login._body.token}`)
        const response = await server.get('/api/v1/product/low_stock').set('Authorization', `Bearer ${login._body.token}`)
        await server.delete(`/api/v1/product/${ createProduct._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(200);
    });

    test('should return not products found with low stock' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get('/api/v1/product/low_stock').set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });

    test('should return page not found with invalid page on find products in low stock' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get(`/api/v1/product/low_stock/?page=${PageNotFound.page}`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });

    test('should return page not found with invalid limit of results on find products in low stock' , async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.get(`/api/v1/product/low_stock/?limit=${PageNotFound.limit}`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(404);
    });
});