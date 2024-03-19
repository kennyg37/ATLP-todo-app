import mongoose from 'mongoose';
import app from '../index';
import request from 'supertest';

describe('Index.ts', () => {
    beforeAll(async () => {
        // Connect to the MongoDB database
        await mongoose.connect('mongodb://localhost:27017/todos');
    });

    afterAll(async () => {
        // Disconnect from the MongoDB database
        await mongoose.disconnect();
    });

    it('should start the server and listen on the specified port', async () => {
        const response = await request(app).get('/todos');
        expect(response.status).toBe(200);
    });

    it('should correctly configure the server to handle requests', async () => {
        const response = await request(app).get('/non-existing-endpoint');
        expect(response.status).toBe(404);
    });

    it('should integrate routes with the Express application', async () => {
        const response = await request(app).get('/todos');
        expect(response.status).toBe(200 || 201 || 204);
    });

    it('should establish a connection to the MongoDB database', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});
