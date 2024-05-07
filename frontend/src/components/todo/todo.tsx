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
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const [showEditTodoId, setShowEditTodoId] = useState<string | null>(null);

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

  const sendSignupData = () => {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const status = (document.getElementById('status') as HTMLInputElement).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;

    const data = {
      title: title,
      description: description,
      status: status,
      startDate: startDate,
      endDate: endDate
    };

    const token = localStorage.getItem('token');
    fetch('https://atlp-todo-app.onrender.com/api/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const todoForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendSignupData();
  };

  const handleDelete = (todoId: any) => {
    const token = localStorage.getItem('token');

    fetch(`https://atlp-todo-app.onrender.com/api/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const sendEditData = (todoId: any, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const status = (document.getElementById('status') as HTMLInputElement).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;

    const data = {
      title: title,
      description: description,
      status: status,
      startDate: startDate,
      endDate: endDate
    };

    const token = localStorage.getItem('token');
    fetch(`https://atlp-todo-app.onrender.com/api/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const toggleCreateTodo = () => {
    setShowCreateTodo(!showCreateTodo);
  };

  const handleEdit = (todoId: any) => {
    setShowEditTodoId(todoId === showEditTodoId ? null : String(todoId));
  }

  return (
    <div className='todo-container'>
      <h2>Todo List</h2>
      <div className='todo-item'>
        {todos.map(todo => (
          <div key={todo.id} className='todo-card'>
            <div>
                <h3>Title: {todo.title}</h3>
                <p>Subtitle: {todo.description}</p>
                <p>Status: {todo.status}</p>
                <p>Start Date: {todo.startDate}</p>
                <p>End Date: {todo.endDate}</p>
                <button onClick={(event) => handleEdit(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                {showEditTodoId === String(todo.id) && (
                <div className='editForm'>
                  <div>
                    <form action="" className='addTodo' onSubmit={(event) => {
                      sendEditData(todo.id, event);
                    }}>
                        <label htmlFor="">Title </label>
                        <input type="text" name="title" id="title" placeholder="Title" />

                        <label htmlFor="">Description </label>
                        <input type="text" name="description" id="description" placeholder="Description" />

                        <label htmlFor="">Status </label>
                        <input type="text" name="status" id="status" placeholder="Status" />

                        <label htmlFor="">Stard date</label>
                        <input type="text" name="startDate" id="startDate" placeholder="Start Date" />

                        <label htmlFor="">End date</label>
                        <input type="text" name="endDate" id="endDate" placeholder="End Date" />
                        <button type="submit">Add Todo</button>
                    </form>
                  </div>
                </div>
              )}
           </div>
          </div>
        ))}
        <div>
            {todos.length === 0 && <p>No todos found</p>}
        </div>
      </div>
      <div className='createTodo'>
        <div className='creaTodoButton'>
          <button onClick={() => {
                toggleCreateTodo();
              }}>Create Todo</button>
          </div>
          {showCreateTodo && (
            
              <div className='addTodoForm'>
                <form action="" className='addTodo' onSubmit={todoForm}>
                    <label htmlFor="">Title </label>
                    <input type="text" name="title" id="title" placeholder="Title" />

                    <label htmlFor="">Description </label>
                    <input type="text" name="description" id="description" placeholder="Description" />

                    <label htmlFor="">Status </label>
                    <input type="text" name="status" id="status" placeholder="Status" />

                    <label htmlFor="">Stard date</label>
                    <input type="text" name="startDate" id="startDate" placeholder="Start Date" />

                    <label htmlFor="">End date</label>
                    <input type="text" name="endDate" id="endDate" placeholder="End Date" />
                    <button type="submit">Add Todo</button>
                </form>
            </div>
          
          )}
      </div>
    </div>
  );
};

export default TodoList;