import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <AddTodoForm onAddTodo={handleAddTodo} />
      {todos.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyText}>No tasks yet. May grace guide you...</span>
        </div>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} task={todo.task} onDelete={() => handleDeleteTodo(todo.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}
