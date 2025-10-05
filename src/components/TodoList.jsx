import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo, mutatingId } = useTodos();

  return (
    <div className={styles.wrapper}>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading && (
        <div className={styles.empty}>
          <span className={styles.emptyText}>Loading...</span>
        </div>
      )}
      {error && (
        <div className={styles.empty}>
          <span className={styles.emptyText}>{error}</span>
        </div>
      )}
      {todos.length === 0 && !isLoading ? (
        <div className={styles.empty}>
          <span className={styles.emptyText}>No tasks yet. May grace guide you...</span>
        </div>
      ) : (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              task={todo.todo || todo.task}
              completed={todo.completed}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              loading={mutatingId === todo.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
