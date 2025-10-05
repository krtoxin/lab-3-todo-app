# Lab 4: Fetching Data. Custom Hooks

## Component Tree + State/Props Data Flow

```mermaid
flowchart TD
  App["App
  (root, no state)"]
  TodoList["TodoList
  (uses useTodos hook)
  Receives: none (root)"]
  useTodos["useTodos (custom hook)
  State: todos[], isLoading, error, mutatingId"]
  AddTodoForm["AddTodoForm
  Props: onAddTodo"]
  TodoItem["TodoItem
  Props: task, completed, loading, onToggle, onDelete"]

  App --> TodoList
  TodoList -.-> useTodos
  TodoList --> AddTodoForm
  TodoList --> TodoItem

  %% Props down (arrows)
  AddTodoForm -- "props: onAddTodo ↓" --> TodoList
  TodoList -- "props: task, completed, loading, onToggle, onDelete ↓" --> TodoItem

  %% Callbacks up (arrows)
  AddTodoForm -.->|onAddTodo(newTask) ↑| TodoList
  TodoItem -.->|onToggle(id), onDelete(id) ↑| TodoList
```

**State:**
- `todos[]`, `isLoading`, `error`, `mutatingId` живуть в `useTodos` (custom hook)

**Props:**
- `onAddTodo` — від `TodoList` до `AddTodoForm`
- `task`, `completed`, `loading`, `onToggle`, `onDelete` — від `TodoList` до кожного `TodoItem`

**Data flow:**  
- Props йдуть вниз (↓), callback-функції піднімаються вгору (↑).

---
