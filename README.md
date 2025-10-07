# Labs 5-6: React Design Patterns (Extended To-Do)

## Component Tree + Data Flow (Updated)

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
    state: todos(filtered), isLoading, error, mutatingId,
           searchTerm,
           currentPage, limitPerPage, totalTodos
    +addTodo()
    +toggleTodo()
    +deleteTodo()
    +setSearchTerm(term)
    +goToNextPage()
    +goToPrevPage()
    +setLimit(limit)
    +editTodoTitle(id, newTitle)
  }
  class AddTodoForm {
    props: onAddTodo
  }
  class TodoItem {
    props: task, completed, loading, onToggle, onDelete, onEdit
  }
  class Controls {
    props: searchTerm, setSearchTerm, currentPage, limitPerPage,
           totalTodos, goToNextPage, goToPrevPage, setLimit
  }

  App --> TodoList
  TodoList --> useTodos : hook
  TodoList --> AddTodoForm : onAddTodo ↓
  TodoList --> Controls : search, pagination ↓
  TodoList --> TodoItem : task, completed, loading, onToggle, onDelete, onEdit ↓
  AddTodoForm ..> TodoList : onAddTodo(newTask) ↑
  TodoItem ..> TodoList : onToggle(id), onDelete(id), onEdit(id, title) ↑
  Controls ..> TodoList : setSearchTerm, setLimit, goToPrevPage/NextPage ↑
```

### Description

- **Composition Root**: `App` renders `TodoList`; it holds no todos state.
- **Single Source of Truth**: `useTodos` encapsulates fetching, pagination, search, and edit.
- **Unidirectional Data Flow**: props go down (`todos`, loading, pagination/search props), callbacks go up (`onAddTodo`, `onToggle`, `onDelete`, `onEdit`, pagination/search setters).
- **Partial API Requests**: list is fetched via `limit` and `skip`; no external storage.

### Used Patterns

- **Custom Hook for Data Logic** (`useTodos`) – encapsulates side effects, state, and CRUD.
- **Container/Presentational Split** – `TodoList` (container) composes presentational `AddTodoForm`, controls, and `TodoItem`.
- **Controlled Components** – search input, edit input, and pagination select are controlled.
- **Optimistic Updates** – toggle, delete, and edit use optimistic updates with rollback.
- **State Colocation** – editing UI state (`isEditing`, `draft`) inside `TodoItem`.

### API Notes

- List endpoint: `GET https://dummyjson.com/todos?limit={n}&skip={k}`
- Edit title: `PUT https://dummyjson.com/todos/{id}` with body `{ todo: "New title" }`
