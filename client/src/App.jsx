import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("❌ Error fetching todos:", err);
    }
  };

  const handleAddTodo = async () => {
    if (!input.trim()) return;
    try {
      if (editId) {
        const res = await axios.put(`http://localhost:5000/api/todos/${editId}`, {
          text: input,
        });
        setTodos(todos.map((t) => (t.id === editId ? res.data : t)));
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/todos", { text: input });
        setTodos([...todos, res.data]);
      }
      setInput("");
    } catch (err) {
      console.error("❌ Error adding/updating todo:", err);
    }
  };

  const handleEdit = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("❌ Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">ToDo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 rounded-l-md border border-purple-400 focus:outline-none"
          />
          <button
            onClick={handleAddTodo}
            className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-purple-100 text-purple-900 px-4 py-2 rounded flex justify-between items-center"
            >
              {todo.text}
              <div className="flex gap-2">
                <button onClick={() => handleEdit(todo.id, todo.text)}>
                  <FaEdit className="text-purple-600" />
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  <FaTrash className="text-red-500" />
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
