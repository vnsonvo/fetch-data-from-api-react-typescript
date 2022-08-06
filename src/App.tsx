import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { TodoType } from "./types/Todo.types";
import NotFound from "./components/NotFound";
import TodoPage from "./components/TodoPage";
import Home from "./components/Home";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [fetchError, setFetchError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <>
      <div className="app">
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Home
                  fetchError={fetchError}
                  isLoading={isLoading}
                  todos={todos}
                />
              }
            />
            <Route path="details/:id" element={<TodoPage todos={todos} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; Son Vo 2022</p>
      </footer>
    </>
  );
}

export default App;
