import { TodoType } from "../types/Todo.types";
import Todo from "./Todo";

type Props = {
  todos: TodoType[];
  isLoading: boolean;
  fetchError: string;
};

const Home: React.FC<Props> = ({ isLoading, fetchError, todos }) => {
  return (
    <main>
      <h1>Home Page</h1>
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
};

export default Home;
