import "./App.css";
import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = "todosApp.todos";
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(savedTodos);
    if (savedTodos) setTodos(savedTodos);
  }, []); //有可能运行两遍，要把strictMode去掉

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodo = [...todos];
    const todo = newTodo.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodo);
  }

  function handleAddNewTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevtodo) => {
      return [...prevtodo, { id: uuid(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearDone(e) {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddNewTodo}>Add New Todo</button>
      <button onClick={handleClearDone}>Clear Done</button>
      <div>{todos.filter((todo) => !todo.complete).length} todos left</div>
    </>
  );
}

export default App;
