# Lab 4: Fetching Data. Custom Hooks

## Component Tree + Data Flow (State & Props)

```mermaid
classDiagram
  class App {
    +renders TodoList
    state: none
  }
  class TodoList {
    +uses useTodos
    props: none (root)
    state: none (all in useTodos)
  }
  class useTodos {
    state: todos[], isLoading, error, mutatingId
    +addTodo()
    +toggleTodo()
    +deleteTodo()
  }
  class AddTodoForm {
    props: onAddTodo
  }
  class TodoItem {
    props: task, completed, loading, onToggle, onDelete
  }

  App --> TodoList
  TodoList --> useTodos : hook
  TodoList --> AddTodoForm : onAddTodo ↓
  TodoList --> TodoItem : task, completed, loading, onToggle, onDelete ↓
  AddTodoForm ..> TodoList : onAddTodo(newTask) ↑
  TodoItem ..> TodoList : onToggle(id), onDelete(id) ↑
```

---

**State:**
- `useTodos` (custom hook): `todos[]`, `isLoading`, `error`, `mutatingId`

**Props:**
- `onAddTodo` — `TodoList` → `AddTodoForm`
- `task`, `completed`, `loading`, `onToggle`, `onDelete` — `TodoList` → `TodoItem`

**Data Flow:**  
- Props flow downward (↓), callback functions flow upward (↑).

---
