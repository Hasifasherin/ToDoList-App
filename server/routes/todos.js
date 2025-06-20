const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// 📥 GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ➕ POST a new todo
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = new Todo({ text });
  const saved = await newTodo.save();
  res.status(201).json(saved);
});

// ✏️ PUT update a todo
router.put("/:id", async (req, res) => {
  const { text } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );
  res.json(updated);
});

// 🗑️ DELETE a todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
