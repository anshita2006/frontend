import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    if (!text) return;
    axios.post('http://localhost:5000/todos', { text })
      .then(res => setTodos([...todos, res.data]));
    setText('');
  };

  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed })
      .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  return (
    <div style={{ margin: '50px auto', width: '400px', textAlign: 'center' }}>
      <h2>📝 Todo List</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{
            textDecoration: todo.completed ? 'line-through' : '',
            margin: '8px 0'
          }}>
            {todo.text}
            <button onClick={() => toggleComplete(todo._id, todo.completed)} style={{ marginLeft: 10 }}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

