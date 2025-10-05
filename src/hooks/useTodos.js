import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const TODOS_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const queryClient = useQueryClient();
  const [mutatingId, setMutatingId] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(TODOS_URL);
      return res.data.todos;
    },
  });

  const addTodo = (text) => {
    queryClient.setQueryData(["todos"], (old = []) => [
      {
        id: Date.now(),
        todo: text,
        completed: false,
        userId: 1,
        isLocal: true, 
      },
      ...old,
    ]);
  };

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }) =>
      axios.put(`${TODOS_URL}/${id}`, { completed }),
    onMutate: async ({ id }) => {
      setMutatingId(id);
      await queryClient.cancelQueries(["todos"]);
      const prevTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
      return { prevTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      setMutatingId(null);
    },
  });

  const toggleTodo = (id) => {
    const todo = queryClient.getQueryData(["todos"]).find((t) => t.id === id);
    if (!todo) return;
    if (todo.isLocal) {
      queryClient.setQueryData(["todos"], (old) =>
        old.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
      return;
    }
    setMutatingId(id);
    toggleMutation.mutate({ id, completed: !todo.completed });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${TODOS_URL}/${id}`),
    onMutate: async (id) => {
      setMutatingId(id);
      await queryClient.cancelQueries(["todos"]);
      const prevTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old.filter((t) => t.id !== id)
      );
      return { prevTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      setMutatingId(null);
    },
  });

  const deleteTodo = (id) => {
    const todo = queryClient.getQueryData(["todos"]).find((t) => t.id === id);
    if (!todo) return;
    if (todo.isLocal) {
      queryClient.setQueryData(["todos"], (old) =>
        old.filter((t) => t.id !== id)
      );
      return;
    }
    setMutatingId(id);
    deleteMutation.mutate(id);
  };

  return {
    todos: data || [],
    isLoading,
    error: error ? error.message : null,
    addTodo,
    toggleTodo,
    deleteTodo,
    mutatingId,
  };
}