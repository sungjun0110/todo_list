import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoText, settodoText] = useState("");
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState('uncompleted');

  const persist = (newTodos) => {
    fetch(`https://sc-todo-list.herokuapp.com/todos`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`, 
      }, 
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`https://sc-todo-list.herokuapp.com/todos`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials.username}:${credentials.password}`, 
      }, 
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText }
    const newTodos = [...todos, newTodo];
    setTodos(newTodos)
    settodoText('');
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) => 
    filter === 'completed' ? todo.checked : !todo.checked);
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  }

  return (
    <div>
      <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Unompleted</option>
      </select>
      {getTodos().map((todo) => (
        <div key={todo.id}>
          <input 
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)} 
            type="checkbox" />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
      <form onSubmit={addTodo}>
        <input 
          value={todoText} 
          onChange={(e) => settodoText(e.target.value)} 
          type="text"></input>
        <button onClick={addTodo}>Add</button>
      </form>
    </div>
  )
}

export default Todo
