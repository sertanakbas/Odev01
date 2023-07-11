import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    const todo = {
      id: Date.now(),
      todoName: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    setNewTodo('');
  };

  const handleTodoToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleAddTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={handleInputChange}
          />
        </form>
      </header>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleTodoToggle(todo.id)}
                />
                <label>{todo.todoName}</label>
                <button
                  className="destroy"
                  onClick={() => handleTodoDelete(todo.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {todos.filter((todo) => !todo.completed).length}
          </strong>{' '}
          item left
        </span>
        <ul className="filters">
          <li>
            <a className="selected">All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};

export default App;
