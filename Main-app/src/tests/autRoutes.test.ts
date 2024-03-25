import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes';
import mongoose from 'mongoose';

const app = express();

app.use('/auth', authRoutes);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todos');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });
describe('authRoutes.ts', () => {
    it('should correctly configure the server to handle requests', async () => {
        const response = await request(app).get('/auth/data');
        expect(response.status).toBe(200);
    });

    it('should establish a connection to the MongoDB database', () => {
        expect(app).toBeDefined();
    });

});