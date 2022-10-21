import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleCheck() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleCheck} />
        {todo.name}
      </label>
    </div>
  );
}
