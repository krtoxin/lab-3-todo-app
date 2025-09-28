import { useState } from "react";
import styles from "../styles/AddTodoForm.module.css";

export default function AddTodoForm({ onAddTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input.trim());
      setInput("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        autoFocus
      />
      <button className={styles.button} type="submit" aria-label="Add">
        +
      </button>
    </form>
  );
}
