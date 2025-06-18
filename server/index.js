const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory todo list
let todos = [];

// ✅ Root route - to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Todo API</title></head>
      <body style="font-family: Arial; background: #f3e8ff; color: #4b0082; padding: 2rem;">
        <h1>🟣 Todo API Server</h1>
        <p>This is the backend for your Todo List project.</p>
        <p>Use <code>/api/todos</code> to interact with the todos.</p>
      </body>
    </html>
  `);
});

// 📥 GET all todos
app.get("/api/todos", (req, res) => {
  console.log("📥 GET /api/todos");
  res.json(todos);
});

// ➕ Add a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  console.log("✅ Added todo:", newTodo);
  res.status(201).json(newTodo);
});

// ✏️ Update a todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((t) => t.id == id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.text = text;
  console.log("✏️ Updated todo:", todo);
  res.json(todo);
});

// 🗑️ Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  console.log("🗑️ Deleted todo with ID:", id);
  res.status(204).end();
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
