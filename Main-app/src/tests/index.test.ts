import mongoose from 'mongoose';
import app from '../index';
import request from 'supertest';

describe('index.ts', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/todos', {
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 450000, 
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should start the server and listen on the specified port', async () => {
        const response = await request(app).get('/auth/data');
        expect(response.status).toBe(200);
    });

    it('should correctly configure the server to handle requests', async () => {
        const response = await request(app).get('/non-existing-endpoint');
        expect(response.status).toBe(404);
    });

    it('should integrate routes with the Express application', async () => {
        const response = await request(app).get('/auth/data');
        expect(response.status).toBe(200 || 201 || 204);
    });

    it('should establish a connection to the MongoDB database', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});
