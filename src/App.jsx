import TodoList from "./components/TodoList";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.appBg}>
      <div className={styles.centerPanel}>
        <h1 className={styles.title}>Elden Ring To-Do List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
