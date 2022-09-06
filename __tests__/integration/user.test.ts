import request from 'supertest';
import app from "../../src/app";

let server = request(app);
jest.setTimeout(60000);

describe('GET /user', () => {
    test('should return all users', async () => {
        const response = await
            server
                .get('/api/v1/user')
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /user', () => {
    
    test('should register the user and return the same with JWT token', async () => {
        const response = await
            server
                .post('/api/v1/user')
                .send({
                    "email": "user_test@compasso.com.br",
                    "password": "123456"
                })
        expect(response.statusCode).toBe(201);
        expect(response._body.token).toBeDefined();
    });

    test('should not register the user with invalid credentials', async () => {
        const response = await
            server
                .post('/api/v1/user')
                .send({
                    "email": "user_testcompasso-com-br",
                    "password": ""
                })
        expect(response.statusCode).toBe(400);
        expect(response._body.token).toBeFalsy();
    });

    test('should not register if email is already in use', async () => {
        const response = await
            server
                .post('/api/v1/user')
                .send({
                    "email": "user_test@compasso.com.br",
                    "password": "123456"
                })
        expect(response.statusCode).toBe(400);
        expect(response._body.token).toBeFalsy();
    });
});