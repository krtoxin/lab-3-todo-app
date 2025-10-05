# Lab 4: Fetching Data. Custom Hooks

## Component Tree + State/Props Data Flow

```mermaid
classDiagram
  class App {
    renders TodoList
    state: none
  }
  class TodoList {
    uses useTodos (hook)
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

- **React Query** is used for fetching and mutating todos.
- All todos state and API logic are in the custom `useTodos` hook.
- State and handlers are passed as props; callbacks go upward.
- App has no state and only renders components.

---
