import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ task, completed, onToggle, onDelete, loading }) {
  return (
    <li className={`${styles.item} ${completed ? styles.completed : ""}`}>
      <label className={styles.label}>
        <span className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={onToggle}
            disabled={loading}
          />
          {loading && <span className={styles.spinner} aria-label="loading"></span>}
        </span>
        <span className={styles.taskText}>{task}</span>
      </label>
      <button className={styles.delete} onClick={onDelete} aria-label="Delete" disabled={loading}>
        ×
      </button>
    </li>
  );
}