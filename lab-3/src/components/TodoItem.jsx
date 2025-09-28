import { useState } from "react";
import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ task, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <li className={`${styles.item} ${isCompleted ? styles.completed : ""}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
        />
        <span>{task}</span>
      </label>
      <button className={styles.delete} onClick={onDelete} aria-label="Delete">
        ×
      </button>
    </li>
  );
}
