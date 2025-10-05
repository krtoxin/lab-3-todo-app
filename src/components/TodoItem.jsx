import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ task, completed, onToggle, onDelete, loading }) {
  return (
    <li className={`${styles.item} ${completed ? styles.completed : ""}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={onToggle}
          disabled={loading}
        />
        <span>{task}</span>
        {loading && <span className={styles.spinner} aria-label="loading"></span>}
      </label>
      <button className={styles.delete} onClick={onDelete} aria-label="Delete" disabled={loading}>
        ×
      </button>
    </li>
  );
}