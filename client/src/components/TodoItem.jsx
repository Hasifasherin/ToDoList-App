import { FaEdit, FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <li className="bg-purple-100 text-purple-900 px-4 py-2 rounded flex justify-between items-center">
      {todo.text}
      <div className="flex gap-2">
        <button onClick={() => onEdit(todo.id, todo.text)}>
          <FaEdit className="text-purple-600" />
        </button>
        <button onClick={() => onDelete(todo.id)}>
          <FaTrash className="text-red-500" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
