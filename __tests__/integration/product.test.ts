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
const ProductUpdatedExample = {
    "title": "Updated title",
    "description": "Updated description",
    "department": "Updated department",
    "brand": "Updated brand",
    "price": 10.0,
    "qtd_stock": 100000
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

describe('POST /product', () => {
    test('should register product with valid credentials', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await server.post('/api/v1/product').send(ProductExampleLowStock).set('Authorization', `Bearer ${login._body.token}`)
        await server.delete(`/api/v1/product/${ response._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(201);
    });

    test('should not register product with invalid token', async () => {
        const response = await server.post('/api/v1/product').send(ProductExampleLowStock).set('Authorization', `Bearer invalidtoken`)
        expect(response.statusCode).toBe(401);
    });

    test('should not register product with bar_codes is already in use', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const ProductExistsInDB = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`)
        const response = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`)
        await server.delete(`/api/v1/product/${ ProductExistsInDB._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(400);
    });
});

describe('PUT /product', () => {
    test('should update product with valid credentials', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`)
        const response = await 
            server.put(`/api/v1/product/${ createProduct._body.id }`)
            .set('Authorization', `Bearer ${login._body.token}`)
            .send(ProductUpdatedExample)
        await server.delete(`/api/v1/product/${ createProduct._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(200);
    });

    test('should not update the product without all credentials', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`)
        const response = await 
            server.put(`/api/v1/product/${ createProduct._body.id }`)
            .set('Authorization', `Bearer ${login._body.token}`)
            .send({
                title: 'Updated title'
            })
        await server.delete(`/api/v1/product/${ createProduct._body.id }`).set('Authorization', `Bearer ${login._body.token}`)
        expect(response.statusCode).toBe(400);
    });

    test('should not update product with invalid id', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await 
            server.put('/api/v1/product/invalidId')
            .set('Authorization', `Bearer ${login._body.token}`)
            .send(ProductUpdatedExample)
        expect(response.statusCode).toBe(400);
    });

    test('should not update product with product not found', async () => {
        const login = await server.post('/api/v1/authenticate').send(UserToLogin)
        const response = await 
            server.put('/api/v1/product/00000000a00000000a00a000')
            .set('Authorization', `Bearer ${login._body.token}`)
            .send(ProductUpdatedExample)
        expect(response.statusCode).toBe(404);
    });
});
