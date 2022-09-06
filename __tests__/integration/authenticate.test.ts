import request from 'supertest';
import app from "../../src/app";

let server = request(app);
jest.setTimeout(60000);

describe('POST /authentication', () => {
    test('should receive JWT token when authenticated with valid credentials', async () => {
        const response = await
            server
                .post('/api/v1/authenticate')
                .send({
                    "email": "bruno.teste@compasso.com.br",
                    "password": "123456"
                })
        expect(response.statusCode).toBe(200);
        expect(response._body.token).toBeDefined();
    });

    test('should not authenticate with invalid credentials', async () => {
        const response = await
            server
                .post('/api/v1/authenticate')
                .send({
                    "email": "bruno.teste@compasso.com.br",
                    "password": "123"
                })
        expect(response.statusCode).toBe(401);
        expect(response._body.token).toBeFalsy();
    });

    test('should not authenticate with user not exists', async () => {
        const response = await
            server
                .post('/api/v1/authenticate')
                .send({
                    "email": "not_exists@compasso.com.br",
                    "password": "123"
                })
        expect(response.statusCode).toBe(404);
        expect(response._body.token).toBeFalsy();
    });
});
