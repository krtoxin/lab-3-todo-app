import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    mutatingId,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
    editTodoTitle,
  } = useTodos();

  const totalPages = Math.max(1, Math.ceil((totalTodos || 0) / (limitPerPage || 1)));

  return (
    <div className={styles.wrapper}>
      <AddTodoForm onAddTodo={addTodo} />
      <div className={styles.topbar}>
        <input
          className={styles.search}
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search todos"
        />
      </div>
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
              onEdit={(newTitle) => editTodoTitle(todo.id, newTitle)}
            />
          ))}
        </ul>
      )}
      <div className={styles.footer}>
        <div className={styles.metrics}>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <span className={styles.metricsDivider}>|</span>
          <span>{totalTodos} items</span>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={goToPrevPage}
            disabled={currentPage <= 1 || isLoading}
          >
            Previous
          </button>
          <button
            className={styles.pageBtn}
            onClick={goToNextPage}
            disabled={isLoading || currentPage >= totalPages}
          >
            Next
          </button>
          <label className={styles.limitLabel}>
            Per page
            <select
              className={styles.limitSelect}
              value={limitPerPage}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
