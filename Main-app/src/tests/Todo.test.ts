import mongoose from 'mongoose';
import Todo from '../models/Todo';

describe('Todo Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');

  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Todo.deleteMany({});
  });

  it('should create and save a new todo successfully', async () => {
    const testData = {
      ID: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      status: 'Pending',
      startDate: new Date(),
      endDate: new Date(),
    };

    const newTodo = new Todo(testData);
    const savedTodo = await newTodo.save();

    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.ID).toBe(testData.ID);
    expect(savedTodo.title).toBe(testData.title);
    expect(savedTodo.description).toBe(testData.description);
    expect(savedTodo.status).toBe(testData.status);
    expect(savedTodo.startDate.toISOString()).toBe(testData.startDate.toISOString());
    expect(savedTodo.endDate.toISOString()).toBe(testData.endDate.toISOString());
  });
});
