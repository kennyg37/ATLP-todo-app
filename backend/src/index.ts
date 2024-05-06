import express from 'express';
import mongoose, { Document } from 'mongoose';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import verifyToken from './middleware/authMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://kalisaken8:ganzaken8@atlp-todo.ridedk4.mongodb.net/todos');
const todoOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Todo API',
        version: '1.0.0',
        description: 'Todo API with Swagger documentation',

      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['**/*.ts'],
  };



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', todoRoutes);
app.use('/auth', authRoutes);

const specs = swaggerJSDoc(todoOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;