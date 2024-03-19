import request from 'supertest';
import express, { Request, Response } from 'express';
import todoRoutes from '../routes/todoRoutes';
import Todo from '../models/Todo';

jest.mock('../models/Todo', () => ({
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
}));

describe('todoRoutes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', todoRoutes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update an existing todo', async () => {
    const newTodo = ({
      ID: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      status: 'Pending',
      startDate: '2024-03-20',
      endDate: '2024-03-25'
    });
    (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(newTodo);

    const response = await request(app)
      .put(`/todos/:_id`)
      .send({
        ID: 2,
        title: 'Updated Todo',
        description: 'This is an updated test todo',
        status: 'Done',
        startDate: '2024-03-21',
        endDate: '2024-03-26'
      });

    expect(response.status).toBe(200);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should delete an existing todo', async () => {
    const newTodo = ({
      ID: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      status: 'Pending',
      startDate: '2024-03-20',
      endDate: '2024-03-25'
    });
    (Todo.findByIdAndDelete as jest.Mock).mockResolvedValue(newTodo);

    const response = await request(app).delete(`/todos/:_id`);

    expect(response.status).toBe(200);
    expect(Todo.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });

  it('should get all todos', async () => {
    const mockTodos = [
      {
        _id: '1',
        ID: 1,
        title: 'Test Todo',
        description: 'This is a test todo',
        status: 'Pending',
        startDate: '2024-03-20T00:00:00.000Z',
        endDate: '2024-03-25T00:00:00.000Z'
      }
    ];
    (Todo.find as jest.Mock).mockResolvedValue(mockTodos);

    const response = await request(app).get('/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTodos);
    expect(Todo.find).toHaveBeenCalledTimes(1);
  });

});