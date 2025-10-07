import { useEffect, useRef, useState } from "react";
import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ task, completed, onToggle, onDelete, onEdit, loading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setDraft(task || "");
  }, [task]);

  const handleSave = () => {
    const next = draft.trim();
    if (!next || next === task) {
      setIsEditing(false);
      return;
    }
    onEdit(next);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(task || "");
      setIsEditing(false);
    }
  };

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
        {isEditing ? (
          <input
            ref={inputRef}
            className={styles.editInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            aria-label="Edit todo title"
          />
        ) : (
          <span className={styles.taskText}>{task}</span>
        )}
      </label>
      {isEditing ? (
        <button className={styles.save} onClick={handleSave} disabled={loading}>
          Save
        </button>
      ) : (
        <>
          <button
            className={styles.edit}
            onClick={() => setIsEditing(true)}
            aria-label="Edit"
            disabled={loading}
          >
            Edit
          </button>
          <button className={styles.delete} onClick={onDelete} aria-label="Delete" disabled={loading}>
            ×
          </button>
        </>
      )}
    </li>
  );
}
