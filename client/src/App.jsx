import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAdd = () => {
    if (task.trim() === "") return;
    if (editId) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, text: task } : todo
      ));
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
    }
    setTask("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setTask(text);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-purple-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          ToDo List <span role="img" aria-label="note">📝</span>
        </h1>

        <div className="flex gap-3 mb-3">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your task"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-500 hover:bg-violet-600 text-white p-3 rounded-full"
            title={editId ? "Update Task" : "Add Task"}
          >
            <FaPlus />
          </button>
        </div>

        {success && (
          <p className="text-purple-600 font-semibold mb-2 text-sm text-center">
            Todo item {editId ? "updated" : "created"} successfully.
          </p>
        )}

        <ul className="space-y-3 mt-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex gap-3">
                {!todo.completed && (
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-gray-600 hover:text-blue-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-gray-600 hover:text-red-600"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
