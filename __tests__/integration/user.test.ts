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