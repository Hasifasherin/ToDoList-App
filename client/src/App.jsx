import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  // 🔄 Fetch todos from backend
  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("❌ Error fetching todos:", err);
    }
  };

  // ➕ Add or ✏️ Update todo
  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      if (editId) {
        const res = await axios.put(`http://localhost:5000/api/todos/${editId}`, {
          text: input,
        });
        setTodos(todos.map((t) => (t.id === editId ? res.data : t)));
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/todos", {
          text: input,
        });
        setTodos([...todos, res.data]);
      }

      setInput("");
    } catch (err) {
      console.error("❌ Error adding/updating todo:", err);
    }
  };

  // ✏️ Start editing
  const handleEdit = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  // 🗑️ Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("❌ Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">ToDo List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 rounded-l-lg border-2 border-purple-400 focus:outline-none focus:ring focus:border-purple-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-all"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-purple-100 text-purple-900 px-4 py-3 rounded-lg flex justify-between items-center shadow"
            >
              <span className="font-medium">{todo.text}</span>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(todo.id, todo.text)}>
                  <FaEdit className="text-purple-600 hover:text-purple-800" />
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  <FaTrash className="text-red-500 hover:text-red-700" />
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
