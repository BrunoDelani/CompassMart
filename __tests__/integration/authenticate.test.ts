import request from 'supertest';
import app from "../../src/app";

let server = request(app);
jest.setTimeout(60000);

describe('POST /authentication', () => {
    it('should receive JWT token when authenticated with valid credentials', async () => {
        const response = await
            server
                .post('/api/v1/authenticate')
                .send({
                    "email": "bruno.teste@compasso.com.br",
                    "password": "123456"
                })
        expect(response.statusCode).toBe(200);
    })
});
