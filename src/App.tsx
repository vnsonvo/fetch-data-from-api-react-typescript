import "./App.css";
import { useState, useEffect } from "react";
import { TodoType } from "./types/Todo.types";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        if (res.ok) {
          setTodos(await res.json());
          setFetchError("");
        }
      } catch (err) {
        if (err instanceof Error) setFetchError(err.message);
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData("https://jsonplaceholder.typicode.com/todos");
  }, []);

  return (
    <main className="App">
      <h1>HomePage</h1>
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (todos.length ? (
          todos.map((todo: TodoType) => <Todo todo={todo} key={todo.id} />)
        ) : (
          <p>No todos to display. Please refresh the page.</p>
        ))}
    </main>
  );
}

export default App;
