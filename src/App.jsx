// src/App.jsx
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = { id: Date.now(), text: input };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">📝 My Todo List</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white shadow-md rounded-md px-4 py-3 mb-2"
            >
              {todo.text}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
