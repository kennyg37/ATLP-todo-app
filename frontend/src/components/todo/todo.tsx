import React, { useEffect, useState } from 'react';
import './todo.css';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://atlp-todo-app.onrender.com/api/todos/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        let todos: Todo[] = data;

        // Reverse the todos array to display the latest todo first
        todos = todos.reverse();

        setTodos(todos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className='todo-container'>
      <h2>Todo List</h2>
      <div>
        {todos.map(todo => (
          <div key={todo.id} className='todo-item'>
            <h3>Title: {todo.title}</h3>
            <p>Subtitle: {todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Start Date: {todo.startDate}</p>
            <p>End Date: {todo.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;