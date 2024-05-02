import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from '../routes/todoRoutes'
import Todo from '../models/Todo';

const app = express();
app.use(express.json());
app.use('/api', todoRoutes); 

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todos');
});

afterEach(async () => {
        await Todo.deleteMany({});
        await mongoose.connection.close();
 });

describe('todoRoutes', () => {
    it('should add a new todo', async () => {
        const token = 'your_valid_jwt_token';
        const response = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo',
                description: 'This is a test todo',
                status: 'Incomplete',
                startDate: '2024-03-25',
                endDate: '2024-03-30'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});



  