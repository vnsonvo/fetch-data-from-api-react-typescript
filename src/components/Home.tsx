import "./Home.css";
import { TodoType } from "../types/Todo.types";
import TodoList from "./TodoList";
import { useState } from "react";

type Props = {
  todos: TodoType[];
  isLoading: boolean;
  fetchError: string;
};

const Home: React.FC<Props> = ({ isLoading, fetchError, todos }) => {
  const [viewType, setViewType] = useState<boolean>(false);

  const handleViewNormalClick = () => {
    if (viewType) setViewType(false);
  };

  const handleViewByGroupOfUserID = () => {
    if (!viewType) setViewType(true);
  };

  return (
    <main className="home">
      <h1>Home Page</h1>
      {isLoading && <h3>Loading todos...</h3>}
      {!isLoading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (todos.length ? (
          <>
            <button onClick={handleViewNormalClick}>View Normal</button>
            <button onClick={handleViewByGroupOfUserID}>
              Group By User ID
            </button>
            <TodoList todos={todos} viewType={viewType} />
          </>
        ) : (
          <h3>No todos to display. Please refresh the page.</h3>
        ))}
    </main>
  );
};

export default Home;
