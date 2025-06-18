const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = []; // Temporary in-memory storage

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add new todo
app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id == id ? { ...todo, ...req.body } : todo
  );
  res.json({ message: "Todo updated" });
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("✅ Welcome to the ToDo API Server!");
});
