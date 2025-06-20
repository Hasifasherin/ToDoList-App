const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Required for Render

// Middlewares
app.use(cors());
app.use(express.json());

// 🔸 In-memory data store
let todos = [];

// ✅ Root route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>ToDo API</title></head>
      <body style="font-family: Arial; background-color: #f3e8ff; color: #4b0082; padding: 2rem;">
        <h1>🟣 ToDo API Server</h1>
        <p>Welcome to your backend!</p>
        <p>Use <code>/api/todos</code> to fetch and manage tasks.</p>
      </body>
    </html>
  `);
});

// 📥 GET all todos
app.get("/api/todos", (req, res) => {
  console.log("📥 [GET] /api/todos");
  res.json(todos);
});

// ➕ POST a new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) {
    console.log("❌ [POST] Text missing");
    return res.status(400).json({ error: "Text is required" });
  }

  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  console.log("✅ [POST] Added:", newTodo);
  res.status(201).json(newTodo);
});

// ✏️ PUT update a todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const todo = todos.find((t) => t.id == id);
  if (!todo) {
    console.log("❌ [PUT] Todo not found:", id);
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.text = text;
  console.log("✏️ [PUT] Updated:", todo);
  res.json(todo);
});

// 🗑️ DELETE a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id != id);

  if (todos.length === initialLength) {
    console.log("⚠️ [DELETE] Todo not found:", id);
  } else {
    console.log("🗑️ [DELETE] Removed ID:", id);
  }

  res.status(204).end();
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
