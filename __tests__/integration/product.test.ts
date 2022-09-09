import request from 'supertest';
import app from '../../src/app';
const fs = require('fs');

const server = request(app);
jest.setTimeout(1000000);

const UserToLogin = {
  email: 'user_test@compasso.com.br',
  password: '123456'
};
const ProductExample = {
  title: 'Azeites, Óleos e Vinagres',
  description: 'Óleo de Soja Soya Garrafa 900ml',
  department: 'Mercearia',
  brand: 'Soya',
  price: 99.99,
  qtd_stock: 99999,
  bar_codes: '1112223334445'
};
const ProductExampleLowStock = {
  title: 'Azeites, Óleos e Vinagres',
  description: 'Óleo de Soja Soya Garrafa 900ml',
  department: 'Mercearia',
  brand: 'Soya',
  price: 99.99,
  qtd_stock: 10,
  bar_codes: '5111222333444'
};
const ProductUpdatedExample = {
  title: 'Updated title',
  description: 'Updated description',
  department: 'Updated department',
  brand: 'Updated brand',
  price: 10.0,
  qtd_stock: 100000
};
const PageNotFound = {
  page: -1,
  limit: -1
};

describe('GET /product', () => {
  test('should return all products', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.get('/api/v1/product').set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should return not products found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return page not found with invalid page', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get(`/api/v1/product/?page=${PageNotFound.page}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return page not found with invalid limit of results', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get(`/api/v1/product/?limit=${PageNotFound.limit}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /product/low_stock', () => {
  test('should return all products with low stock', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExampleLowStock).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.get('/api/v1/product/low_stock').set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should return not products found with low stock', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product/low_stock').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return page not found with invalid page on find products in low stock', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get(`/api/v1/product/low_stock/?page=${PageNotFound.page}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should return page not found with invalid limit of results on find products in low stock', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get(`/api/v1/product/low_stock/?limit=${PageNotFound.limit}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /product', () => {
  test('should register product with valid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.post('/api/v1/product').send(ProductExampleLowStock).set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${response._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(201);
  });

  test('should register product with invalid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.post('/api/v1/product').send({
      title: 'create product'
    }).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not register product with invalid token', async () => {
    const response = await server.post('/api/v1/product').send(ProductExampleLowStock);
    expect(response.statusCode).toBe(401);
  });

  test('should not register product with bar_codes is already in use', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const ProductExistsInDB = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${ProductExistsInDB._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });
});

describe('PUT /product', () => {
  test('should update product with valid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await
    server.put(`/api/v1/product/${createProduct._body.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(ProductUpdatedExample);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should not update the product without all credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await
    server.put(`/api/v1/product/${createProduct._body.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .send({
        title: 'Updated title'
      });
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not update product with invalid id', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await
    server.put('/api/v1/product/invalidId')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(ProductUpdatedExample);
    expect(response.statusCode).toBe(400);
  });

  test('should not update product with product not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await
    server.put('/api/v1/product/00000000a00000000a00a000')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send(ProductUpdatedExample);
    expect(response.statusCode).toBe(404);
  });
});

describe('PATCH /product', () => {
  test('should update product with valid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await
    server.patch(`/api/v1/product/${createProduct._body.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .send({ qtd_stock: 100 });
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should not update the product with invalid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await
    server.put(`/api/v1/product/${createProduct._body.id}`)
      .set('Authorization', `Bearer ${login._body.token}`)
      .send({
        title: 100
      });
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not update product with invalid token', async () => {
    const response = await
    server.patch('/api/v1/product/invalidId')
      .set('Authorization', 'Bearer invalidToken')
      .send({ qtd_stock: 100 });
    expect(response.statusCode).toBe(401);
  });

  test('should not update product with invalid id', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await
    server.patch('/api/v1/product/invalidId')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send({ qtd_stock: 100 });
    expect(response.statusCode).toBe(400);
  });

  test('should not update product if product not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await
    server.patch('/api/v1/product/00000000a00000000a00a000')
      .set('Authorization', `Bearer ${login._body.token}`)
      .send({ qtd_stock: 100 });
    expect(response.statusCode).toBe(404);
  });
});

describe('GET BY ID /product', () => {
  test('should get product with valid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.get(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should not get product with invalid id', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product/invalidId').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not get product with invalid token', async () => {
    const response = await server.get('/api/v1/product/invalidId').set('Authorization', 'Bearer invalidToken');
    expect(response.statusCode).toBe(401);
  });

  test('should not update product if product not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product/00000000a00000000a00a000').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /product', () => {
  test('should delete product with valid credentials', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(204);
  });

  test('should not delete product with invalid id', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.delete('/api/v1/product/invalidId').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not delete product with invalid token', async () => {
    const response = await server.delete('/api/v1/product/invalidId').set('Authorization', 'Bearer');
    expect(response.statusCode).toBe(401);
  });

  test('should not delete product if product not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.delete('/api/v1/product/00000000a00000000a00a000').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /product/marketplace', () => {
  test('should mapper product', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.get(`/api/v1/product/marketplace/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });

  test('should not mapper product with invalid id', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product/marketplace/invalidId').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(400);
  });

  test('should not mapper product with invalid token', async () => {
    const response = await server.get('/api/v1/product/marketplace/invalidId').set('Authorization', 'Bearer invalid Token');
    expect(response.statusCode).toBe(401);
  });

  test('should not mapper product if product not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server.get('/api/v1/product/marketplace/00000000a00000000a00a000').set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /product/csv', () => {
  test('should register products with valid credentials', async () => {
    const filePath = `${__dirname}/testFiles/product-list-test.csv`;
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server
      .post('/api/v1/product/csv')
      .set('Authorization', `Bearer ${login._body.token}`)
      .attach('file', filePath);
    expect(response.statusCode).toBe(200);
  });

  test('should not register products if file not found', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const response = await server
      .post('/api/v1/product/csv')
      .set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(404);
  });

  test('should not register products with invalid token', async () => {
    const response = await server
      .post('/api/v1/product/csv')
      .set('Authorization', 'B invalidToken');
    expect(response.statusCode).toBe(401);
  });
});
